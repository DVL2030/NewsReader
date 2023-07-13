import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  bookmark: null,
  bookmarkEntries: null,
  successAdd: false,
  successRemove: false,
  loadingAdd: false,
  loadingRemove: false,
  loading: false,
  error: null,
};

export const getBookmark = createAsyncThunk(
  "bookmark/get",
  async (_, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/bookmark/get",
        data: { userId: userInfo.id },
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
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

export const getBookmarkEntries = createAsyncThunk(
  "bookmark/getAllEntries",
  async (_, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/bookmark/getAllEntries",
        data: { userId: userInfo.id },
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
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

export const addToBookmark = createAsyncThunk(
  "bookmark/add",
  async (data, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/bookmark/add",
        data: { userId: userInfo.id, data: data },
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      return true;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const removeFromBookmark = createAsyncThunk(
  "bookmark/remove",
  async (id, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/bookmark/remove",
        data: { userId: userInfo.id, id: id },
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      return true;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const bookmarkSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookmark.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBookmark.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.bookmark = action.payload;
    });
    builder.addCase(getBookmark.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getBookmarkEntries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBookmarkEntries.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.bookmarkEntries = action.payload;
    });
    builder.addCase(getBookmarkEntries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addToBookmark.pending, (state) => {
      state.loadingAdd = true;
    });
    builder.addCase(addToBookmark.fulfilled, (state, action) => {
      state.loadingAdd = false;
      state.error = null;
      state.successAdd = action.payload;
    });
    builder.addCase(addToBookmark.rejected, (state, action) => {
      state.loadingAdd = false;
      state.error = action.payload;
    });
    builder.addCase(removeFromBookmark.pending, (state) => {
      state.loadingRemove = true;
    });
    builder.addCase(removeFromBookmark.fulfilled, (state, action) => {
      state.loadingRemove = false;
      state.error = null;
      state.successRemove = action.payload;
    });
    builder.addCase(removeFromBookmark.rejected, (state, action) => {
      state.loadingRemove = false;
      state.error = action.payload;
    });
  },
});

export default bookmarkSlice.reducer;
