import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  subscription: null,
  loading: false,
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
        method: "get",
        url: "/api/subscription/get",
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
  },
});

export default userSlice.reducer;
