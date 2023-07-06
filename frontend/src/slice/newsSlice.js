import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const newsHome = localStorage.getItem("newsHome")
  ? JSON.parse(localStorage.getItem("newsHome"))
  : null;

const initialState = {
  newsHome,
  newsTopic: null,
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
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const getTopic = createAsyncThunk(
  "news/topic",
  async (topic, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/news/topic", { topic: topic });
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
    builder.addCase(getTopic.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTopic.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.newsTopic = action.payload;
    });
    builder.addCase(getTopic.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default newsSlice.reducer;
