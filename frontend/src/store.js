import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./slice/newsSlice";

const initialState = {
  //   userAuth: {
  //     userInfo: localStorage.getItem("userInfo")
  //       ? JSON.parse(localStorage.getItem("userInfo"))
  //       : null,
  //   },
  news: {
    newsHome: localStorage.getItem("newsHome")
      ? JSON.parse(localStorage.getItem("newsHome"))
      : null,
  },
};

export const store = configureStore({
  reducer: {
    // userAuth: userAuthSlice,

    news: newsSlice,
  },
  preloadedState: initialState,
});
