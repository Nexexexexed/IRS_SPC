import { configureStore } from "@reduxjs/toolkit";
import citizensReducer from "./slices/citizensSlice";
import statsReducer from "./slices/statSlice";

export const store = configureStore({
  reducer: {
    citizens: citizensReducer,
    stats: statsReducer,
  },
});

export default store;
