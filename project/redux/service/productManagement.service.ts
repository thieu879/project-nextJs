import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async () => {
    const response = await axios.get("http://localhost:8080/product");
    return response.data
  }
)
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8080/product/${id}`);
      return id;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (newAdmin: any, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8080/product", newAdmin);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (updatedAdmin: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8080/product/${updatedAdmin.id}`, updatedAdmin);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);
