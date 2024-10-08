import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TUser, TUserState } from "../../../interfaces";

const initialState: TUserState = {
  user: {
    name: "",
    email: "",

  },
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout(state: TUserState) {
      state.user = {name: "", email: ""};
      state.token = "";
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token as string;

export const useCurrentUser = (state: RootState) => state.auth.user as TUser;
