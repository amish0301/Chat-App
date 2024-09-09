import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER}/api/admin/verify`,
      { secretKey },
      config
    );

    return data;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
});

const getAdmin = createAsyncThunk("admin/getAdmin", async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/admin`,
      { withCredentials: true }
    );
    return data.admin;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
});

const adminLogout = createAsyncThunk("admin/logout", async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/admin/logout`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw error?.response?.data?.message || error;
  }
});
export { adminLogin, getAdmin, adminLogout };
