// container/src/types/mf.d.ts

declare module 'dashboard/App' {
  const Component: import('react').ComponentType<any>;
  export default Component;
}

declare module 'cart/App' {
  const Component: import('react').ComponentType<any>;
  export default Component;
}

declare module 'ui/Button' {
  export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
  const Button: import('react').ForwardRefExoticComponent<
    ButtonProps & import('react').RefAttributes<HTMLButtonElement>
  >;
  export default Button;
}

declare module 'cart/store' {
  import { RootState } from 'cart/src/store';

  export const selectCartCount: (state: RootState) => number;
}

declare module 'cart/cartSlice' {
  import { PayloadAction, Slice } from '@reduxjs/toolkit';

  export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }

  export interface CartState {
    items: CartItem[];
  }

  export const cartSlice: Slice<CartState>;
  export const addToCart: (item: CartItem) => PayloadAction<CartItem>;
  export default cartSlice.reducer;
}
