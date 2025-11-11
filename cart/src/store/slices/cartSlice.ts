import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define the Product type
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// Define the initial state
interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      console.log(`Product added to cart: ${action.payload.title}`, state.items);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;