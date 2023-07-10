import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  feedSearched: null,
  loading: false,
  error: null,
};

export const searchFeeds = createAsyncThunk(
  "feed/search",
  async (keyword, { rejectWithValue }) => {
    try {
      const res = await Axios.post("/api/feeds/search", { keyword: keyword });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchFeeds.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchFeeds.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.feedSearched = action.payload;
    });
    builder.addCase(searchFeeds.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default feedSlice.reducer;
