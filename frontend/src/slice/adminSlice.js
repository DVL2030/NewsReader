import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  dashboard: null,
  user: null,
  news: null,
  loading: false,
  error: null,
};

export const getDashboardOverview = createAsyncThunk(
  "admin/getDashboard",
  async (_, { getState, rejectWithValue }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/admin/dashboard",
        data: { user: userInfo },
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

export const getAdminNewsOverview = createAsyncThunk(
  "admin/getAdminOrderOverView",
  async (_, { getState, rejectWithValue }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/admin/news",
        data: { user: userInfo },
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

export const getAdminUserOverview = createAsyncThunk(
  "admin/getAdminUserOverView",
  async (_, { getState, rejectWithValue }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/admin/user",
        data: { user: userInfo },
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

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDashboardOverview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getDashboardOverview.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.dashboard = action.payload;
    });
    builder.addCase(getDashboardOverview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAdminUserOverview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminUserOverview.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(getAdminUserOverview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAdminNewsOverview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminNewsOverview.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.news = action.payload;
    });
    builder.addCase(getAdminNewsOverview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default adminSlice.reducer;
