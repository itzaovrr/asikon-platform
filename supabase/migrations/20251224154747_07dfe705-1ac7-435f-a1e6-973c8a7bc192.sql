-- Seed categories
INSERT INTO public.categories (id, name, slug, icon) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567801', 'T-Shirts', 'tshirts', '👕'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567802', 'Hoodies', 'hoodies', '🧥'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567803', 'Sneakers', 'sneakers', '👟'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567804', 'Bags', 'bags', '👜'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Jackets', 'jackets', '🧥'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567806', 'Accessories', 'accessories', '💎'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567807', 'Pants', 'pants', '👖'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567808', 'Dresses', 'dresses', '👗')
ON CONFLICT (id) DO NOTHING;

-- Seed products
INSERT INTO public.products (id, name, slug, description, price, original_price, image_url, category_id, is_featured, rating, review_count, stock) VALUES
  -- T-Shirts
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567801', 'Classic Cotton Tee', 'classic-cotton-tee', 'Premium cotton t-shirt with a comfortable fit for everyday wear', 29.99, 39.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', true, 4.8, 156, 100),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567802', 'Graphic Print Tee', 'graphic-print-tee', 'Stylish graphic tee with urban streetwear design', 34.99, NULL, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', false, 4.5, 89, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567803', 'Oversized Fit Tee', 'oversized-fit-tee', 'Trendy oversized t-shirt perfect for a relaxed look', 32.99, 42.99, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567801', true, 4.7, 203, 50),
  
  -- Hoodies
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567804', 'Urban Streetwear Hoodie', 'urban-streetwear-hoodie', 'Cozy hoodie with kangaroo pocket and adjustable drawstring', 79.99, 99.99, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', true, 4.9, 312, 60),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567805', 'Zip-Up Fleece Hoodie', 'zip-up-fleece-hoodie', 'Warm fleece hoodie with full zip and side pockets', 69.99, NULL, 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', false, 4.6, 178, 80),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567806', 'Premium Pullover Hoodie', 'premium-pullover-hoodie', 'High-quality pullover hoodie with embroidered logo', 89.99, 109.99, 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567802', true, 4.8, 245, 45),
  
  -- Sneakers
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567807', 'Classic White Sneakers', 'classic-white-sneakers', 'Timeless white leather sneakers for any occasion', 129.99, 159.99, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567803', true, 4.9, 567, 100),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567808', 'Running Performance Shoes', 'running-performance-shoes', 'Lightweight running shoes with responsive cushioning', 149.99, NULL, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567803', false, 4.7, 423, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567809', 'High-Top Basketball Shoes', 'high-top-basketball-shoes', 'Professional basketball shoes with ankle support', 179.99, 219.99, 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567803', true, 4.8, 289, 40),
  
  -- Bags
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567810', 'Urban Backpack', 'urban-backpack', 'Stylish and functional backpack for daily commute', 89.99, 119.99, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567804', true, 4.7, 234, 55),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567811', 'Leather Crossbody Bag', 'leather-crossbody-bag', 'Premium leather crossbody bag with adjustable strap', 149.99, NULL, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567804', false, 4.6, 156, 30),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567812', 'Canvas Tote Bag', 'canvas-tote-bag', 'Eco-friendly canvas tote for shopping and everyday use', 39.99, 49.99, 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567804', false, 4.5, 178, 100),
  
  -- Jackets
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567813', 'Bomber Jacket', 'bomber-jacket', 'Classic bomber jacket with quilted lining', 159.99, 199.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567805', true, 4.8, 312, 35),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567814', 'Denim Jacket', 'denim-jacket', 'Vintage-style denim jacket with distressed details', 129.99, NULL, 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567805', false, 4.7, 245, 50),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567815', 'Leather Biker Jacket', 'leather-biker-jacket', 'Premium leather biker jacket with asymmetric zipper', 299.99, 399.99, 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567805', true, 4.9, 189, 20),
  
  -- Accessories
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567816', 'Classic Watch', 'classic-watch', 'Elegant timepiece with leather strap', 199.99, 249.99, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567806', true, 4.8, 423, 40),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567817', 'Sunglasses', 'sunglasses', 'UV-protected sunglasses with polarized lenses', 89.99, NULL, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567806', false, 4.6, 267, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567818', 'Baseball Cap', 'baseball-cap', 'Adjustable cotton cap with embroidered logo', 29.99, 39.99, 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567806', false, 4.5, 345, 150),
  
  -- Pants
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567819', 'Slim Fit Jeans', 'slim-fit-jeans', 'Classic slim fit jeans with stretch comfort', 79.99, 99.99, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567807', true, 4.7, 456, 80),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567820', 'Cargo Pants', 'cargo-pants', 'Utility cargo pants with multiple pockets', 69.99, NULL, 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567807', false, 4.6, 234, 60),
  
  -- Dresses
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567821', 'Summer Floral Dress', 'summer-floral-dress', 'Light and breezy floral print dress', 89.99, 119.99, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567808', true, 4.8, 312, 45),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567822', 'Evening Cocktail Dress', 'evening-cocktail-dress', 'Elegant cocktail dress for special occasions', 149.99, 189.99, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500', 'a1b2c3d4-e5f6-7890-abcd-ef1234567808', true, 4.9, 178, 25)
ON CONFLICT (id) DO NOTHING;