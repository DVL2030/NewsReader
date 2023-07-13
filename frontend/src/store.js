import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./slice/newsSlice";
import userSlice from "./slice/userSlice";
import subSlice from "./slice/subSlice";
import feedSlice from "./slice/feedSlice";
import bookmarkSlice from "./slice/bookmarkSlice";

const initialState = {
  user: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  sub: {
    stream: localStorage.getItem("stream")
      ? JSON.parse(localStorage.getItem("stream"))
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
  },
  preloadedState: initialState,
});
