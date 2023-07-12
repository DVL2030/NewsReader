import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  newsHome: null,
  newsSource: null,
  newsEntry: null,
  loading: false,
  error: null,
};

export const getHomePage = createAsyncThunk(
  "news/home",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/news/home");
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

export const getSource = createAsyncThunk(
  "news/source",
  async (source, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/news/source", { source: source });

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

export const getEntry = createAsyncThunk(
  "news/entry",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/news/entry", { id: id });
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
      state.newsHome = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getTopic.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getSource.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSource.fulfilled, (state, action) => {
      state.newsSource = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getSource.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getEntry.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEntry.fulfilled, (state, action) => {
      state.newsEntry = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getEntry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default newsSlice.reducer;
