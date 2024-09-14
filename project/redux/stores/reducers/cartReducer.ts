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

export const getCartItem = createAsyncThunk(
  "cart/getCartItem",
  async () => {
    const response = await axios.get("http://localhost:8080/cart");
    return response.data
  }
)
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
)
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (item: CartItem, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:8080/cart`, item);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || 'An error occurred');
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (itemId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8080/cart/${itemId}`);
      return itemId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || 'An error occurred');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
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
      .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const item = action.payload;
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          state.items.push(item);
        }
      })
      .addCase(removeItemFromCart.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(getCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })
  },
});

export default cartSlice.reducer;
