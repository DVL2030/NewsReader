import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const stream = sessionStorage.getItem("stream")
  ? JSON.parse(sessionStorage.getItem("stream"))
  : null;

const initialState = {
  subscription: null,
  subLoading: false,
  stream,
  loading: false,
  success: false,
  error: null,
};

// All async func definition

export const getSubscription = createAsyncThunk(
  "subscription/get",
  async (_, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/subscription/get",
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

export const subscribeFeed = createAsyncThunk(
  "subscription/subscribe",
  async (feed, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/subscription/subscribe",
        data: { userId: userInfo.id, feed: feed },
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

export const unSubscribeFeed = createAsyncThunk(
  "subscription/unsubscribe",
  async (feedId, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/subscription/unsubscribe",
        data: { userId: userInfo.id, id: feedId },
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

export const streamFeed = createAsyncThunk(
  "subscription/stream",
  async (_, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const res = await Axios({
        method: "post",
        url: "/api/subscription/stream",
        data: { userId: userInfo.id },
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      sessionStorage.setItem("stream", JSON.stringify(res.data));
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubscription.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSubscription.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.subscription = action.payload;
    });
    builder.addCase(getSubscription.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(subscribeFeed.pending, (state) => {
      state.subLoading = true;
      state.success = false;
    });
    builder.addCase(subscribeFeed.fulfilled, (state, action) => {
      state.subLoading = false;
      state.error = null;
      state.success = action.payload;
    });
    builder.addCase(subscribeFeed.rejected, (state, action) => {
      state.subLoading = false;
      state.error = action.payload;
    });
    builder.addCase(unSubscribeFeed.pending, (state) => {
      state.subLoading = true;
      state.success = false;
    });
    builder.addCase(unSubscribeFeed.fulfilled, (state, action) => {
      state.subLoading = false;
      state.error = null;
      state.success = action.payload;
    });
    builder.addCase(unSubscribeFeed.rejected, (state, action) => {
      state.subLoading = false;
      state.error = action.payload;
    });
    builder.addCase(streamFeed.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(streamFeed.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.stream = action.payload;
    });
    builder.addCase(streamFeed.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
