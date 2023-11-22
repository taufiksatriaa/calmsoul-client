// disini kita akan membuat storenya dan memasang reducer dari slice yang kita buat
import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "../features/users/login";
import googleSlice from "../features/users/loginGoogle";
import todosSlice from "../features/todos/todos";
import registerSlice from "../features/users/register";
import video from "../features/todos/todosById";
export default configureStore({
  reducer: {
    login: userSlicer,
    googleLogin: googleSlice,
    todosSlice,
    register: registerSlice,
    video,
  },
});
