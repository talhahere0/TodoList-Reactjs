import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoggedIn: false
  },
  reducers: {
    // isLoggedIn: true,
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    }
  },
  logout: (state) => {
    state.user = null;
  }
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
