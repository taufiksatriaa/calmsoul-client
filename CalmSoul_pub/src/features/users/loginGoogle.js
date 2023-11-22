import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  error: null,
};

export const googleSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure } = googleSlice.actions;

// Async action for Google login
export const googleLoginAsync = (credential, navigate) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "https://calm.bryanowen.tech/auth-google",
      null,
      {
        headers: { token: credential },
      }
    );

    dispatch(loginSuccess(data));
    localStorage.setItem("token", data);
    // Navigate or perform other actions as needed
    navigate("/main");
  } catch (error) {
    dispatch(loginFailure(error.message));
    console.log(error);
  }
};

export default googleSlice.reducer;
