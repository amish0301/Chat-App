import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAdmin: false,
  loader: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
    setLoading: (state, action) => {
      state.loader = action.payload
    }
  },
});

export default authSlice;
export const { userExists, userNotExists, setLoading } = authSlice.actions;