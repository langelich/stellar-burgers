import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';

describe('RootReducer tests', () => {
  const storeTest = configureStore({
    reducer: rootReducer
  });

  const initialStateTest = {
    feed: {
      error: null,
      feeds: {
        total: 0,
        totalToday: 0
      },
      orders: []
    },
    ingredients: {
      error: null,
      isLoading: false,
      ingredients: []
    },
    ingredientsInConstructor: {
      error: null,
      ingredientsInConstructor: {
        bun: null,
        ingredients: []
      },
      isModalOpen: false
    },
    orders: {
      error: null,
      orderData: null,
      orderRequest: false,
      isModalOpen: false
    },
    user: {
      isLoading: false,
      isUserChecked: false,
      userProfile: null,
      error: '',
      userOrders: []
    }
  };

  test('check initial state rootReducer', () => {
    expect(storeTest.getState()).toEqual(initialStateTest);
  });

  test('action: unUnknownAction', () => {
    const action = { type: 'unUnknownAction', payload: { total: 500 } };
    storeTest.dispatch(action);
    expect(storeTest.getState()).toEqual(initialStateTest);
  });
});
