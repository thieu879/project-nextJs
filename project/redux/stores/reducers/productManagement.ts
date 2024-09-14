import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addProduct, deleteProduct, getProduct, updateProduct, updateProductStock } from "../../service/productManagement.service";

interface Product {
  id: number;
  name: string;
  image: string;
  stock: number;
  price: string;
  description: string;
}

interface ProductState {
  product: Product[];
}

const initialState: ProductState = {
  product: [],
};

// Define a payload type for updating stock
interface UpdateStockPayload {
  id: number;
  stock: number;
}

const productManagement = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.product = state.product.filter(product => product.id !== action.payload);
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.product.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.product.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.product[index] = action.payload;
        }
      })
      .addCase(updateProductStock.fulfilled, (state, action: PayloadAction<UpdateStockPayload>) => {
        const { id, stock } = action.payload;
        const productIndex = state.product.findIndex((p) => p.id === id);
        if (productIndex !== -1) {
          state.product[productIndex].stock = stock;
        }
      });
  },
});

export default productManagement.reducer;
