import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isLoggedIn: boolean;
  username: string | null;
};

const initialState: AuthState = {
  isLoggedIn: false,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ userName: string, password: string }>) {
      state.isLoggedIn = true;
      state.username = action.payload.userName;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;