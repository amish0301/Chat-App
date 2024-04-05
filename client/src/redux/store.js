import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import utilitySlice from "./reducers/misc";
import api from "./apis/api";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [utilitySlice.name]: utilitySlice.reducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware],
});

export default store;