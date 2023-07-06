import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const newsHome = localStorage.getItem("newsHome")
  ? JSON.parse(localStorage.getItem("newsHome"))
  : null;

console.log(newsHome);

const initialState = {
  newsHome,
  loading: false,
  error: null,
};

export const getHomePage = createAsyncThunk(
  "news/home",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/news/home");
      localStorage.setItem("newsHome", JSON.stringify(res.data));
      return res.data;
    } catch (error) {}
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomePage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHomePage.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.newsHome = action.payload;
    });
    builder.addCase(getHomePage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default newsSlice.reducer;
