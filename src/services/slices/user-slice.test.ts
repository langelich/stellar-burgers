import {
  getOrdersThunk,
  getUserThunk,
  loginUserThunk,
  logoutThunk,
  registerUserThunk,
  updateUserThunk
} from '../asyncThunks';
import userSlice, { checkUser } from './user-slice';

describe('Tests userSlice.reducer', () => {
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
    isLoading: false,
    isUserChecked: false,
    userProfile: null,
    error: '',
    userOrders: []
  };

  test('action: checkUser', () => {
    const newState = userSlice.reducer(initialState, checkUser());

    expect(newState).toEqual({
      isLoading: false,
      isUserChecked: true,
      userProfile: null,
      error: '',
      userOrders: []
    });
  });

  test('action: (getUserThunk, registerUserThunk, loginUserThunk, updateUserThunk, logoutThunk, getOrdersThunk) is pending', () => {
    const action = [
      { type: getUserThunk.pending.type },
      { type: registerUserThunk.pending.type },
      { type: loginUserThunk.pending.type },
      { type: updateUserThunk.pending.type },
      { type: logoutThunk.pending.type },
      { type: getOrdersThunk.pending.type }
    ];

    action.forEach((actionPending) => {
      const newState = userSlice.reducer(initialState, actionPending);

      expect(newState).toEqual({
        isLoading: true,
        isUserChecked: false,
        userProfile: null,
        error: '',
        userOrders: []
      });
    });
  });

  test('action: (getUserThunk, registerUserThunk, loginUserThunk, updateUserThunk, logoutThunk, getOrdersThunk) is rejected', () => {
    const action = [
      { type: getUserThunk.rejected.type, error: { message: 'Error' } },
      { type: registerUserThunk.rejected.type, error: { message: 'Error' } },
      { type: loginUserThunk.rejected.type, error: { message: 'Error' } },
      { type: updateUserThunk.rejected.type, error: { message: 'Error' } },
      { type: logoutThunk.rejected.type, error: { message: 'Error' } },
      { type: getOrdersThunk.rejected.type, error: { message: 'Error' } }
    ];

    action.forEach((actionRejected) => {
      const newState = userSlice.reducer(initialState, actionRejected);

      expect(newState).toEqual({
        isLoading: false,
        isUserChecked: false,
        userProfile: null,
        error: 'Error',
        userOrders: []
      });
    });
  });

  test('action: getUserThunk is fulfilled', () => {
    const action = {
      type: getUserThunk.fulfilled.type,
      payload: { user: { email: 'email', name: 'name' } }
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isLoading: false,
      isUserChecked: true,
      userProfile: { email: 'email', name: 'name' },
      error: '',
      userOrders: []
    });
  });

  test('action: registerUserThunk is fulfilled', () => {
    const action = {
      type: registerUserThunk.fulfilled.type,
      payload: { user: { email: 'email@ya.ru', name: 'name' } }
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isLoading: false,
      isUserChecked: true,
      userProfile: { email: 'email@ya.ru', name: 'name' },
      error: '',
      userOrders: []
    });
  });

  test('action: loginUserThunk is fulfilled', () => {
    const initialState = {
      isLoading: false,
      isUserChecked: true,
      userProfile: { email: 'email@ya.ru', name: 'name' },
      error: '',
      userOrders: []
    };

    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: { user: { email: 'email@ya.ru', name: 'name' } }
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isLoading: false,
      isUserChecked: true,
      userProfile: { email: 'email@ya.ru', name: 'name' },
      error: '',
      userOrders: []
    });
  });

  test('action: logoutThunk is fulfilled', () => {
    const initialState = {
      isLoading: false,
      isUserChecked: false,
      userProfile: { email: 'email@ya.ru', name: 'name' },
      error: '',
      userOrders: []
    };

    const action = { type: logoutThunk.fulfilled.type, payload: {} };
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isLoading: false,
      isUserChecked: false,
      userProfile: null,
      error: '',
      userOrders: []
    });
  });

  test('action: getOrdersThunk is fulfilled', () => {
    const initialState = {
      isLoading: false,
      isUserChecked: false,
      userProfile: { email: 'email@ya.ru', name: 'name' },
      error: '',
      userOrders: []
    };

    const action = { type: getOrdersThunk.fulfilled.type, payload: mockOrders };
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isLoading: false,
      isUserChecked: false,
      userProfile: { email: 'email@ya.ru', name: 'name' },
      error: '',
      userOrders: mockOrders
    });
  });

  test('action: updateUserThunk is fulfilled', () => {
    const initialState = {
      isLoading: false,
      isUserChecked: false,
      userProfile: { email: 'email@ya.ru', name: 'name' },
      error: '',
      userOrders: []
    };

    const action = {
      type: updateUserThunk.fulfilled.type,
      payload: { user: { email: 'emailNew@ya.ru', name: 'Alex' } }
    };
    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isLoading: false,
      isUserChecked: false,
      userProfile: { email: 'emailNew@ya.ru', name: 'Alex' },
      error: '',
      userOrders: []
    });
  });
});
