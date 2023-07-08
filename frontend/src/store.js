import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./slice/newsSlice";
import userSlice from "./slice/userSlice";

const initialState = {
  user: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  news: {
    newsHome: localStorage.getItem("newsHome")
      ? JSON.parse(localStorage.getItem("newsHome"))
      : null,
  },
};

export const store = configureStore({
  reducer: {
    // userAuth: userAuthSlice,
    user: userSlice,
    news: newsSlice,
  },
  preloadedState: initialState,
});
