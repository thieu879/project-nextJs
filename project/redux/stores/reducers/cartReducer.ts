import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/cart/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || 'An error occurred');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async (updatedItem: CartItem, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8080/cart/${updatedItem.id}`, updatedItem);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || 'An error occurred');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
