import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";

/* eslint-disable no-underscore-dangle */
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
/* eslint-enable */

export default store;