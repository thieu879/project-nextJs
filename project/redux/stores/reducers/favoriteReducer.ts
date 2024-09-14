import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface FavoriteItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity?: number;
}

interface FavoriteState {
  items: FavoriteItem[];
}

const initialState: FavoriteState = {
  items: [],
};

export const getFavoriteItems = createAsyncThunk(
  "favorite/getFavoriteItems",
  async () => {
    const response = await axios.get("http://localhost:8080/favorites");
    return response.data;
  }
);

export const fetchFavoriteItems = createAsyncThunk(
  'favorite/fetchFavoriteItems',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/favorites/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || 'An error occurred');
    }
  }
);

export const updateFavoriteItem = createAsyncThunk(
  'favorite/updateFavoriteItem',
  async (updatedItem: FavoriteItem, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8080/favorites/${updatedItem.id}`, updatedItem);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || 'An error occurred');
    }
  }
);

export const addItemToFavorites = createAsyncThunk(
  'favorite/addItemToFavorites',
  async (item: FavoriteItem, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:8080/favorites`, item);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || 'An error occurred');
    }
  }
);

export const removeItemFromFavorites = createAsyncThunk(
  'favorite/removeItemFromFavorites',
  async (itemId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8080/favorites/${itemId}`);
      return itemId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || 'An error occurred');
    }
  }
);

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteItems.fulfilled, (state, action: PayloadAction<FavoriteItem[]>) => {
        state.items = action.payload;
      })
      .addCase(updateFavoriteItem.fulfilled, (state, action: PayloadAction<FavoriteItem>) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(addItemToFavorites.fulfilled, (state, action: PayloadAction<FavoriteItem>) => {
        const item = action.payload;
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
        } else {
          state.items.push(item);
        }
      })
      .addCase(removeItemFromFavorites.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(getFavoriteItems.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default favoriteSlice.reducer;
