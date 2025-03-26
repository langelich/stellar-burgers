import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';
import { arrayMoveImmutable } from 'array-move';
import {
  getFeedsThunk,
  getIngredientsThunk,
  makeOrderBurgerThunk
} from '../asyncThunks';

type TFeedsResponse = {
  total: number;
  totalToday: number;
};

export interface productsData {
  isLoading: boolean;
  error: null | string;
  orderData: TOrder | null;
  ingredients: TIngredient[];
  ingredientsInConstructor: {
    bun: TIngredient | null;
    ingredients: TIngredient[];
  };
  orderRequest: boolean;
  ingredientData: TIngredient | null;
  orders: TOrder[] | [];
  feeds: TFeedsResponse;
  isModalOpen: boolean;
}

export const initialState: productsData = {
  isLoading: false,
  error: null,
  orderData: null,
  ingredients: [],
  ingredientsInConstructor: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  ingredientData: null,
  orders: [],
  feeds: {
    total: 0,
    totalToday: 0
  },
  isModalOpen: false
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addIngredientsInConstructor: (
      state,
      action: PayloadAction<TIngredient>
    ) => {
      action.payload.type === 'bun'
        ? (state.ingredientsInConstructor.bun = action.payload)
        : state.ingredientsInConstructor.ingredients.push(action.payload);
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      state.ingredientsInConstructor.ingredients = arrayMoveImmutable(
        state.ingredientsInConstructor.ingredients,
        action.payload,
        action.payload - 1
      );
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      state.ingredientsInConstructor.ingredients = arrayMoveImmutable(
        state.ingredientsInConstructor.ingredients,
        action.payload,
        action.payload + 1
      );
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
      state.ingredientsInConstructor.ingredients.splice(action.payload, 1);
    }
  },
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectIngredients: (state) => state.ingredients,
    selectIngredientsInConstructor: (state) => state.ingredientsInConstructor,
    selectOrderData: (state) => state.orderData,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrders: (state) => state.orders,
    selectFeeds: (state) => state.feeds,
    selectIsModalOpen: (state) => state.isModalOpen
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(makeOrderBurgerThunk.pending, (state, action) => {
        state.orderRequest = true;
        state.orderData = null;
        state.error = null;
        state.isModalOpen = true;
      })
      .addCase(makeOrderBurgerThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message!;
      })
      .addCase(makeOrderBurgerThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderData = action.payload.order;
        state.ingredientsInConstructor = {
          bun: null,
          ingredients: []
        };
      })
      .addCase(getFeedsThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
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

export const {
  addIngredientsInConstructor,
  moveUpIngredient,
  moveDownIngredient,
  deleteIngredient,
  closeModal
} = productsSlice.actions;
export const {
  selectIsLoading,
  selectIngredients,
  selectIngredientsInConstructor,
  selectOrderData,
  selectOrderRequest,
  selectOrders,
  selectFeeds,
  selectIsModalOpen
} = productsSlice.selectors;

export default productsSlice;
