import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  successAdd: false,
  successRemove: false,
  loading: false,
  error: null,
};

export const addToBookmark = createAsyncThunk(
  "bookmark/add",
  async (id, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/bookmark/add",
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
    builder.addCase(addToBookmark.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToBookmark.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.successAdd = action.payload;
    });
    builder.addCase(addToBookmark.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(removeFromBookmark.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeFromBookmark.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.successRemove = action.payload;
    });
    builder.addCase(removeFromBookmark.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default bookmarkSlice.reducer;
