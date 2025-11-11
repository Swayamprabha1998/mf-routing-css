import type { RootState } from '../index';

// Basic selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

// Derived selectors
export const selectUserRole = (state: RootState) => state.auth.user?.role;
export const selectUserId = (state: RootState) => state.auth.user?.id;
export const selectUserEmail = (state: RootState) => state.auth.user?.email;
export const selectUserName = (state: RootState) => state.auth.user?.name;

// Computed selectors
export const selectIsAdmin = (state: RootState) => state.auth.user?.role === 'admin';
export const selectIsUser = (state: RootState) => state.auth.user?.role === 'user';
export const selectHasValidToken = (state: RootState) =>
  state.auth.isAuthenticated && !!state.auth.token;