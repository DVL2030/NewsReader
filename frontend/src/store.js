import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./slice/newsSlice";
import userSlice from "./slice/userSlice";
import subSlice from "./slice/subSlice";
import feedSlice from "./slice/feedSlice";
import bookmarkSlice from "./slice/bookmarkSlice";
import adminSlice from "./slice/adminSlice";
import gptSlice from "./slice/gptSlice";

const initialState = {
  user: {
    userInfo: sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : null,
  },
  sub: {
    stream: sessionStorage.getItem("stream")
      ? JSON.parse(sessionStorage.getItem("stream"))
      : null,
  },
};

export const store = configureStore({
  reducer: {
    user: userSlice,
    news: newsSlice,
    subscription: subSlice,
    feed: feedSlice,
    sub: subSlice,
    bookmark: bookmarkSlice,
    admin: adminSlice,
    gpt: gptSlice,
  },
  preloadedState: initialState,
});
