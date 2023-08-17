import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Axios from "axios";

const initialState = {
  resMsg: null,
  loading: false,
  error: null,
};

export const askGPT = createAsyncThunk(
  "chatGpt/ask",
  async (messages, { rejectWithValue }) => {
    try {
      const res = await Axios.post("/api/chatGpt/ask", { messages: messages });
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

const gptSlice = createSlice({
  name: "chatGpt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(askGPT.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(askGPT.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.resMsg = action.payload.message;
    });
    builder.addCase(askGPT.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default gptSlice.reducer;
