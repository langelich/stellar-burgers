import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsThunk } from '../asyncThunks';

type TFeedsResponse = {
  total: number;
  totalToday: number;
};

export interface feedData {
  error: null | string;
  feeds: TFeedsResponse;
  orders: TOrder[] | [];
}

export const initialState: feedData = {
  error: null,
  feeds: {
    total: 0,
    totalToday: 0
  },
  orders: []
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeeds: (state) => state.feeds,
    selectOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.feeds.total = action.payload.total;
        state.feeds.totalToday = action.payload.totalToday;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.error = action.error.message!;
      });
  }
});

export const { selectFeeds, selectOrders } = feedSlice.selectors;

export default feedSlice;
