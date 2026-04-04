import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  // Roles can be 'admin', 'user', 'seller' etc.
  role: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      
      // YAHAN ROLES ME CHANGES KARNA HAI:
      // API se jo role aayega usko yahan set karna. Filhal test ke liye
      // agar payload me role nahi hai toh default 'admin' set kar rahe hain.
      state.role = action.payload.role || 'admin'; 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.role = null;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    }
  },
});

export const { login, logout, setRole } = authSlice.actions;
export default authSlice.reducer;