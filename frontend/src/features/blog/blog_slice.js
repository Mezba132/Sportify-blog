import { createSlice } from "@reduxjs/toolkit";
import { addPostAsync } from "./blog_thunks";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearAll(state) {
      state.posts = [];
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(addPostAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addPostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })

      .addCase(addPostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearAll } = blogsSlice.actions;
export default blogsSlice.reducer;
