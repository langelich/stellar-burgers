import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import userSlice from './slices/user-slice';
import ingredientsSlice from './slices/ingredients';
import feedSlice from './slices/feed';
import ordersSlice from './slices/orders';
import ingredientsInConstructorSlice from './slices/ingredientsInConstructor';

export const rootReducer = combineSlices(
  userSlice,
  ingredientsSlice,
  feedSlice,
  ordersSlice,
  ingredientsInConstructorSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
