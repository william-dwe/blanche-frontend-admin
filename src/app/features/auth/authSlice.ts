import { createSlice } from '@reduxjs/toolkit';
import { IGetProfileResponse } from '../../../helpers/types';
import Cookies from 'universal-cookie';

interface StateProps {
  user: IGetProfileResponse | null;
  isLoggedIn: boolean;
}

const cookie = new Cookies();

const initialState: StateProps = {
  user: null,
  isLoggedIn: cookie.get('is_admin_logged_in'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logout, setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
