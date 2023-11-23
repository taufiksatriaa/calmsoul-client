import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  video: {},
  loading: false,
  error: "",
};

export const todosByIdSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    fetchPending(state) {
      state.loading = true;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.video = action.payload;
    },
    fetchReject(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchReject } =
  todosByIdSlice.actions;

export const fetchAsync = (videoId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch(fetchPending());
    const { data } = await axios.get(
      `https://h29jm9rs-3000.asse.devtunnels.ms/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(fetchSuccess(data.video)); // Assuming data has a 'video' property
  } catch (error) {
    dispatch(fetchReject(error.message));
    Swal.fire({
      icon: "error",
      title: error.message,
    });
  }
};

export default todosByIdSlice.reducer;
