import { createAsyncThunk } from "@reduxjs/toolkit";
export const addPostAsync = createAsyncThunk(
  "blogs/addPostAsync",
  async (postData, thunkAPI) => {
    const response = await fetch("https://example.com/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue("Failed to post blog");
    }

    const data = await response.json();
    return data;
  }
);
