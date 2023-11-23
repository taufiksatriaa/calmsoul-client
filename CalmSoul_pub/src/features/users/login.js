// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const { loginPending, loginSuccess, loginFail, logout } =
  userSlice.actions;
export const loginAsync = (userInput, navigate) => async (dispatch) => {
  // const navigate = useNavigate();
  try {
    dispatch(loginPending());

    const response = await axios.post(
      "https://h29jm9rs-3000.asse.devtunnels.ms/login",
      userInput
    );

    const token = response.data.access_token;
    localStorage.setItem("token", token);

    dispatch(loginSuccess(response.data));
    Swal.fire({
      icon: "success",
      title: "hello",
    });
    navigate("/main");
  } catch (error) {
    dispatch(loginFail(error.message));
    Swal.fire({
      icon: "error",
      title: error.message,
    });
  }
};

export default userSlice.reducer;
