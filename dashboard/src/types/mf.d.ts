declare module 'container/context/TokenContext' {
  import { ReactNode } from 'react';

  export const TokenProvider: React.FC<{ children: ReactNode }>;
  export const useToken: () => string | null;
}

declare module 'ui/Button' {
  import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

  interface UIButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode;
  }

  const UIButton: React.FC<UIButtonProps>;
  export default UIButton;
}

declare module 'cart/cartSlice' {
  import { PayloadAction, Reducer } from '@reduxjs/toolkit';
  import { Product } from 'cart/store';
  import { CartState } from 'cart/src/store/slices/cartSlice';

  export const addToCart: (product: Product) => PayloadAction<Product>;
  const cartReducer: Reducer<CartState>;
  export default cartReducer;
}

declare module 'cart/store' {
  import { configureStore } from '@reduxjs/toolkit';
  import { CartState } from 'cart/src/store/slices/cartSlice';

  export const store: ReturnType<typeof configureStore>;
  export type RootState = { cart: CartState };
  export type AppDispatch = typeof store.dispatch;
  export const selectCartCount: (state: RootState) => number;
}