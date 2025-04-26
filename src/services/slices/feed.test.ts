import { getFeedsThunk } from '../asyncThunks';
import feedSlice from './feed';

describe('Tests feedSlice.reducer', () => {
  const mockOrders = [
    {
      _id: '680ca027e8e61d001cec498e',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0942'
      ],
      status: 'done',
      name: 'Флюоресцентный антарианский space альфа-сахаридный экзо-плантаго spicy бургер',
      createdAt: '2025-04-26T08:58:15.320Z',
      updatedAt: '2025-04-26T08:58:16.031Z',
      number: 75693
    },
    {
      _id: '680c9c49e8e61d001cec498b',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941'
      ],
      status: 'done',
      name: 'Краторный био-марсианский люминесцентный бургер',
      createdAt: '2025-04-26T08:41:45.748Z',
      updatedAt: '2025-04-26T08:41:46.660Z',
      number: 75692
    },
    {
      _id: '680c9813e8e61d001cec4985',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2025-04-26T08:23:47.897Z',
      updatedAt: '2025-04-26T08:23:48.627Z',
      number: 75691
    }
  ];

  const initialState = {
    error: null,
    feeds: {
      total: 0,
      totalToday: 0
    },
    orders: []
  };

  test('action: getFeedsThunk is pending', () => {
    const initialState = {
      error: 'Error',
      feeds: {
        total: 0,
        totalToday: 0
      },
      orders: []
    };

    const action = { type: getFeedsThunk.pending.type };
    const newState = feedSlice.reducer(initialState, action);

    expect(newState).toEqual({
      error: null,
      feeds: {
        total: 0,
        totalToday: 0
      },
      orders: []
    });
  });

  test('action: getFeedsThunk is fulfilled', () => {
    const action = {
      type: getFeedsThunk.fulfilled.type,
      payload: { orders: mockOrders, total: 500, totalToday: 100 }
    };
    const newState = feedSlice.reducer(initialState, action);

    expect(newState).toEqual({
      error: null,
      feeds: {
        total: 500,
        totalToday: 100
      },
      orders: mockOrders
    });
  });

  test('action: getFeedsThunk is rejected', () => {
    const action = {
      type: getFeedsThunk.rejected.type,
      error: { message: 'Error' }
    };
    const newState = feedSlice.reducer(initialState, action);

    expect(newState).toEqual({
      error: 'Error',
      feeds: {
        total: 0,
        totalToday: 0
      },
      orders: []
    });
  });
});
