-- Fix 1: Add search_path to the update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix 2: Create function to validate order item prices against product catalog
CREATE OR REPLACE FUNCTION public.validate_order_item_price()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  catalog_price DECIMAL(10,2);
BEGIN
  -- Get current product price from catalog
  SELECT price INTO catalog_price
  FROM public.products
  WHERE id = NEW.product_id;
  
  -- If product doesn't exist, reject
  IF catalog_price IS NULL THEN
    RAISE EXCEPTION 'Product not found: %', NEW.product_id;
  END IF;
  
  -- Validate submitted price matches catalog (allow 0.01 rounding difference)
  IF ABS(NEW.price - catalog_price) > 0.01 THEN
    RAISE EXCEPTION 'Order item price validation failed for product %: submitted %, expected %',
      NEW.product_id, NEW.price, catalog_price;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for order item price validation
DROP TRIGGER IF EXISTS validate_order_item_price_trigger ON public.order_items;
CREATE TRIGGER validate_order_item_price_trigger
BEFORE INSERT ON public.order_items
FOR EACH ROW
EXECUTE FUNCTION public.validate_order_item_price();

-- Fix 3: Create function to validate order total against order items
CREATE OR REPLACE FUNCTION public.validate_order_total()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  calculated_total DECIMAL(10,2);
  shipping_cost DECIMAL(10,2) := 10.00;
BEGIN
  -- Calculate total from order_items using product prices from catalog
  SELECT COALESCE(SUM(oi.quantity * p.price), 0) + shipping_cost
  INTO calculated_total
  FROM public.order_items oi
  JOIN public.products p ON p.id = oi.product_id
  WHERE oi.order_id = NEW.id;
  
  -- Validate submitted total matches calculated total (allow 0.01 rounding difference)
  IF ABS(NEW.total - calculated_total) > 0.01 THEN
    RAISE EXCEPTION 'Order total validation failed: submitted %, expected %', 
      NEW.total, calculated_total;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for order total validation (runs AFTER order_items are inserted)
-- We use a constraint trigger with DEFERRED to run after all order_items are inserted
DROP TRIGGER IF EXISTS validate_order_total_trigger ON public.orders;

-- Since we need to validate after order_items are inserted, we use an UPDATE trigger approach
-- The order is created first, then items are added, so we validate on a separate call
-- Alternative: Create a function that must be called to finalize the order

-- For now, let's validate on UPDATE since order creation happens first, then items
CREATE TRIGGER validate_order_total_trigger
BEFORE UPDATE ON public.orders
FOR EACH ROW
WHEN (OLD.status = 'pending' AND NEW.status != 'pending')
EXECUTE FUNCTION public.validate_order_total();