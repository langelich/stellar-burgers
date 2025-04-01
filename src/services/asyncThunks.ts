import {
  getFeedsApi,
  getIngredientsApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../utils/cookie';

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const makeOrderBurgerThunk = createAsyncThunk(
  'order/makeOrder',
  async (idsIngredients: string[]) => orderBurgerApi(idsIngredients)
);

export const getOrdersThunk = createAsyncThunk('orders/getAll', async () =>
  getOrdersApi()
);

export const getFeedsThunk = createAsyncThunk('feeds/getAll', async () =>
  getFeedsApi()
);

export const getUserThunk = createAsyncThunk('user/getData', async () =>
  getUserApi()
);

export const registerUserThunk = createAsyncThunk(
  'user/newUser',
  async (data: TRegisterData) => {
    const dataUser = registerUserApi(data);
    setCookie('accessToken', (await dataUser).accessToken);
    localStorage.setItem('refreshToken', (await dataUser).refreshToken);
    return dataUser;
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const dataUser = loginUserApi(data);
    setCookie('accessToken', (await dataUser).accessToken);
    localStorage.setItem('refreshToken', (await dataUser).refreshToken);
    return dataUser;
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/updateData',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const logoutThunk = createAsyncThunk('user/logout', async () => {
  const dataUser = await logoutApi().finally(() => {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  });
  return dataUser;
});
