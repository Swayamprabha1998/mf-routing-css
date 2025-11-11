import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Export types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Selector to get the cart product count
export const selectCartCount = (state: RootState) => state.cart?.items?.length || 0;