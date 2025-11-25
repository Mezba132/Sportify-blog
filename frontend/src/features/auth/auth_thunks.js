import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/auth_api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.login(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.err || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.register(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.err || "Register failed");
    }
  }
);
