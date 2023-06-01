import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "./spotifySlice";

export const store = configureStore({
  reducer: {
    data: stateSlice,
  },
});
