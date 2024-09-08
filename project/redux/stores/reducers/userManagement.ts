import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAdmin, deleteAdmin, deleteUsers, getAdmins, getUsers, loginUser, updateAdmin, updateAdminStatus, updateUserStatus } from "../../service/userManagement.service";

interface User {
  id: number;
  name: string;
  email: string;
  status: boolean;
  role: number;
}

interface UserState {
  users: User[];
}



const initialState: UserState = {
  users: [],
};

const userManagement = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
    .addCase(deleteUsers.fulfilled, (state, action) => {
  state.users = state.users.filter((users) => users.id !== action.payload);
    })
    .addCase(updateUserStatus.fulfilled, (state, action) => {
        const user = state.users.find((user) => user.id === action.payload.id);
        if (user) {
          user.status = action.payload.status;
        }
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
      if (userIndex !== -1) {
        state.users[userIndex] = action.payload;
      }
    })
    .addCase(getAdmins.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(updateAdminStatus.fulfilled, (state, action) => {
        const index = state.users.findIndex(admin => admin.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.users = state.users.filter(admin => admin.id !== action.payload);
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
  },
});

export default userManagement.reducer;
