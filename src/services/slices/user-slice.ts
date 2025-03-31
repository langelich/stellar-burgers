import { createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import {
  getOrdersThunk,
  getUserThunk,
  loginUserThunk,
  logoutThunk,
  registerUserThunk,
  updateUserThunk
} from '../asyncThunks';

export interface userData {
  isLoading: boolean;
  isUserChecked: boolean;
  userProfile: TUser | null;
  error: string;
  userOrders: TOrder[];
}

export const initialState: userData = {
  isLoading: false,
  isUserChecked: false,
  userProfile: null,
  error: '',
  userOrders: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkUser: (state) => {
      state.isUserChecked = true;
    }
  },
  selectors: {
    selectUserProfile: (state) => state.userProfile,
    selectIsLoading: (state) => state.isLoading,
    selectIsUserChecked: (state) => state.isUserChecked,
    selectError: (state) => state.error,
    selectUserOrders: (state) => state.userOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.userProfile = null;
        state.isLoading = true;
        state.error = '';
        state.isUserChecked = false;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.userProfile = null;
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.userProfile = action.payload.user;
        state.isLoading = false;
        state.isUserChecked = true;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.userProfile = null;
        state.isLoading = true;
        state.error = '';
        state.isUserChecked = false;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.userProfile = null;
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.userProfile = action.payload.user;
        state.isLoading = false;
        state.error = '';
        state.isUserChecked = true;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.userProfile = null;
        state.isLoading = true;
        state.error = '';
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.userProfile = null;
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.userProfile = action.payload.user;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.userProfile = state.userProfile;
        state.isLoading = true;
        state.error = '';
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.userProfile = state.userProfile;
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.userProfile = action.payload.user;
        state.isLoading = false;
        state.error = '';
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = '';
        state.userProfile = null;
      })
      .addCase(getOrdersThunk.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.error = action.error.message!;
        state.isLoading = false;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.error = '';
        state.isLoading = false;
      });
  }
});

export const { checkUser } = userSlice.actions;
export const {
  selectUserProfile,
  selectError,
  selectIsUserChecked,
  selectUserOrders,
  selectIsLoading
} = userSlice.selectors;

export default userSlice;
