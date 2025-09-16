import { configureStore } from "@reduxjs/toolkit";
import citizensReducer from "./slices/citizensSlice";

export const store = configureStore({
  reducer: {
    citizens: citizensReducer,
  },
});

export default store;
