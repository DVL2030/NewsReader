import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./slice/newsSlice";
import userSlice from "./slice/userSlice";
import subSlice from "./slice/subSlice";
import feedSlice from "./slice/feedSlice";
import bookmarkSlice from "./slice/bookmarkSlice";

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
  },
  preloadedState: initialState,
});
