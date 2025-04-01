import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { makeOrderBurgerThunk } from '../asyncThunks';

export interface ordersData {
  error: null | string;
  orderData: TOrder | null;
  orderRequest: boolean;
  isModalOpen: boolean;
}

export const initialState: ordersData = {
  error: null,
  orderData: null,
  orderRequest: false,
  isModalOpen: false
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isModalOpen = false;
    }
  },
  selectors: {
    selectOrderData: (state) => state.orderData,
    selectOrderRequest: (state) => state.orderRequest,
    selectIsModalOpen: (state) => state.isModalOpen
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrderBurgerThunk.pending, (state) => {
        state.orderRequest = true;
        state.orderData = null;
        state.error = null;
        state.isModalOpen = true;
      })
      .addCase(makeOrderBurgerThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message!;
        state.orderData = null;
      })
      .addCase(makeOrderBurgerThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderData = action.payload.order;
      });
  }
});

export const { closeModal } = ordersSlice.actions;
export const { selectOrderData, selectOrderRequest, selectIsModalOpen } =
  ordersSlice.selectors;

export default ordersSlice;
