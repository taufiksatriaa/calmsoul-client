// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  user: null,
  error: null,
  loading: false,
};

const registerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerPending(state) {
      state.loading = true;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    registerFail(state, action) {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { registerPending, registerSuccess, registerFail } =
  registerSlice.actions;

export const registerAsync = (userInput, navigate) => async (dispatch) => {
  try {
    dispatch(registerPending());
    await axios.post(
      "https://h29jm9rs-3000.asse.devtunnels.ms/register",
      userInput
    );
    dispatch(registerSuccess(userInput));
    navigate("/login");
  } catch (error) {
    dispatch(registerFail(error.message));
  }
};

export default registerSlice.reducer;
