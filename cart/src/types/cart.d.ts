declare module 'cart/cartSlice' {
  import { Product } from './store/slices/cartSlice';
  import { PayloadAction, Slice } from '@reduxjs/toolkit';

  export interface CartState {
    items: Product[];
  }

  export const addToCart: (product: Product) => PayloadAction<Product>;
  const cartSlice: Slice<CartState>;
  export default cartSlice;
}