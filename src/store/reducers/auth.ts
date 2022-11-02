import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface iAuthState {
  isLoggedIn: boolean;
  userId: string | undefined;
  userEmail: string | undefined;
}

const initialState: iAuthState = {
  isLoggedIn: false,
  userId: undefined,
  userEmail: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{
        userId: string;
        userEmail: string;
      }>,
    ) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.userId = undefined;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
