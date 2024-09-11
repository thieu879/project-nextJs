import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from "crypto-js";

interface User {
  id: number;
  name: string;
  email: string;
  status: boolean;
  statusLogIn: boolean;
  role: number;
}

enum RoleType {
  User = 1,
  Admin = 0,
}

export const getUsers:any = createAsyncThunk(
  "user/getUsers",
  async () => {
    const response = await axios.get("http://localhost:8080/account");
    return response.data.filter((user: any) => user.role === RoleType.User);
  }
);

export const deleteUsers = createAsyncThunk(
  "users/deleteUsers",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8080/account/${id}`);
      return id;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateUserStatus = createAsyncThunk(
  "user/updateStatus",
  async ({ id, status }: { id: number; status: boolean }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:8080/account/${id}`, {
        status: !status,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser: any = createAsyncThunk(
  "admin/loginUser",
  async ({ email, password }: any, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8080/account");
      const user = response.data.find((user: any) => {
        const decryptedPassword = CryptoJS.AES.decrypt(user.password, "secret key 123").toString(CryptoJS.enc.Utf8);
        return user.email === email && decryptedPassword === password;
      });

      if (!user) {
        return rejectWithValue("Invalid email or password");
      }
      
      return user;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAdmins = createAsyncThunk(
  "admin/getAdmins",
  async () => {
    const response = await axios.get("http://localhost:8080/account");
    return response.data.filter((admin: any) => admin.role === RoleType.Admin);
  }
);
export const updateAdminStatus = createAsyncThunk(
  "admin/updateStatus",
  async ({ id, status }: { id: number; status: boolean }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:8080/account/${id}`, {
        status: !status,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteAdmin = createAsyncThunk(
  "admin/deleteadmin",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8080/account/${id}`);
      return id;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addAdmin = createAsyncThunk(
  "userManagement/addAdmin",
  async (newAdmin: any, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8080/account", newAdmin);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "userManagement/updateAdmin",
  async (updatedAdmin: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8080/account/${updatedAdmin.id}`, updatedAdmin);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data.message || "An error occurred");
    }
  }
);

export const updateUserStatusLogIn:any = createAsyncThunk(
  "user/updateStatusLogIn",
  async ({ id, statusLogIn }: { id: number; statusLogIn: boolean }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:8080/account/${id}`, {
        statusLogIn: statusLogIn,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
