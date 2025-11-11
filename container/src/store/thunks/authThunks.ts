import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../slices/authSlice';

// Types for API responses
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

// Mock API service (replace with your actual API calls)
class AuthService {
  // Replace with your actual API URL when implementing real API calls
  // private static API_BASE = 'http://localhost:3001/api';

  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          resolve({
            user: {
              id: '1',
              email: credentials.email,
              name: 'John Doe',
              role: 'user',
            },
            token: 'mock-jwt-token',
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });

    // Actual implementation would be:
    // const response = await fetch(`${this.API_BASE}/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(credentials),
    // });
    // if (!response.ok) throw new Error('Login failed');
    // return response.json();
  }

  static async register(credentials: RegisterCredentials): Promise<LoginResponse> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '2',
            email: credentials.email,
            name: credentials.name,
            role: 'user',
          },
          token: 'mock-jwt-token',
        });
      }, 1000);
    });
  }

  static async logout(): Promise<void> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }

  static async refreshToken(_token: string): Promise<{ token: string }> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ token: 'new-mock-jwt-token' });
      }, 500);
    });
  }
}

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Logout failed');
    }
  }
);

export const refreshAuthToken = createAsyncThunk(
  'auth/refreshToken',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await AuthService.refreshToken(token);
      return response.token;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Token refresh failed');
    }
  }
);