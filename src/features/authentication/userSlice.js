import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import userApi from "../../API/userAPI";

export const getMe = createAsyncThunk(
  "user/getMe",
  async (params, thunkApi) => {
    console.log("on get me");
    const currentUser = await userApi.getMe();
    console.log("on get me: current user", currentUser);
    return currentUser;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {},
    isLogin: false,
    loading: false,
    error: "",
  },
  reducers: {
    clearUser: (state, action) => {
      state.isLogin = false;
    },
  },
  extraReducers: {
    [getMe.pending]: (state) => {
      state.loading = true;
    },
    [getMe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getMe.fulfilled]: (state, action) => {
      console.log("fulfilled: ", action);
      state.loading = false;
      state.isLogin = true;
      state.current = action.payload;
    },
  },
});
export const clearUser = userSlice.actions.clearUser
const userReducer = userSlice.reducer;
//const { reducer: userReducer } = userSlice;
export default userReducer;
