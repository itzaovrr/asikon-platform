Remove Cash on Delivery (COD) since all products are digital. Also remove shipping address requirements and shipping fees from the checkout flow — digital products don't ship.

## Changes

### 1. Checkout (`src/pages/Checkout.tsx`)
- Remove `cod` from `PAYMENT_OPTIONS`. Keep `card` and `bkash`.
- Default `paymentMethod` to `"card"`.
- Remove the entire "Shipping address" section and address state.
- Remove the `shipping` fee line; total = subtotal.
- Pass `shippingAddress: {}` (or null) to `createOrder`.

### 2. Order creation (`src/hooks/useOrders.ts`)
- Simplify `payment_status` line (drop the COD ternary).
- Allow empty shipping address.

### 3. Trust strip (`src/components/layout/TrustStrip.tsx`)
- Replace "Cash on Delivery Available" with a digital-product trust item, e.g. "Instant Digital Access".
- Replace "7 Days Easy Exchange" with "7-Day Money-Back Guarantee" (refund instead of exchange, since digital).

### 4. Order detail (`src/pages/OrderDetail.tsx`)
- Drop the `"cod"` branch in the payment method label rendering.

### 5. Copy cleanup
- `src/pages/Help.tsx`: remove the "Do you offer Cash on Delivery?" FAQ entry, replace with a digital-delivery FAQ.
- `src/pages/Refund.tsx`: drop the "COD orders are refunded via mobile banking or bKash" sentence; refunds go to original payment method only.
- `src/pages/Terms.tsx`: drop "(or COD acceptance)" parenthetical; orders confirmed when payment is verified.

### 6. Admin (`src/pages/admin/AdminOrders.tsx`)
- No structural change — the `payment_method` column will simply never be `cod` going forward. Existing historical COD rows still render their string verbatim.

## Out of scope
- No DB migration. `orders.payment_method` stays a free-text column; we just stop writing `"cod"`. Existing historical orders are preserved.
- No payment provider integration in this pass. Card/bKash remain UI-only as before.
