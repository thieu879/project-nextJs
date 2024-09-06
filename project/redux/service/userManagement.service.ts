import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  status: boolean;
  role: number;
}

enum RoleType {
  User = 1,
  Admin = 2,
}



export const getUsers = createAsyncThunk<User[]>(
  "admin/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>("http://localhost:8080/user");
      return response.data.filter(user => user.role === RoleType.User);
    } catch (error:any) {
      return rejectWithValue(error.response?.data || "Fetching users failed");
    }
  }
);