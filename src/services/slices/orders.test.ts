import { makeOrderBurgerThunk } from '../asyncThunks';
import ordersSlice, { closeModal } from './orders';

describe('Tests ordersSlice.reducer', () => {
  const initialState = {
    error: null,
    orderData: null,
    orderRequest: false,
    isModalOpen: false
  };

  test('action: closeModal', () => {
    const newState = ordersSlice.reducer(initialState, closeModal());

    expect(newState).toEqual({
      error: null,
      orderData: null,
      orderRequest: false,
      isModalOpen: false
    });
  });

  test('action: makeOrderBurgerThunk is pending', () => {
    const action = { type: makeOrderBurgerThunk.pending.type };
    const newState = ordersSlice.reducer(initialState, action);

    expect(newState).toEqual({
      error: null,
      orderData: null,
      orderRequest: true,
      isModalOpen: true
    });
  });

  test('action:  makeOrderBurgerThunk is fulfilled', () => {
    const action = {
      type: makeOrderBurgerThunk.fulfilled.type,
      payload: {
        order: {
          _id: '68076a3ee8e61d001cec3ebe',
          status: 'done',
          name: 'Краторный spicy люминесцентный бургер',
          createdAt: '2025-04-22T10:06:54.894Z',
          updatedAt: '2025-04-22T10:06:55.564Z',
          number: 75274,
          ingredients: [
            {
              _id: '643d69a5c3f7b9001cfa093e',
              name: 'Филе Люминесцентного тетраодонтимформа',
              type: 'main',
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: 'https://code.s3.yandex.net/react/code/meat-03.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/meat-03-large.png',
              __v: 0
            },
            {
              _id: '643d69a5c3f7b9001cfa0942',
              name: 'Соус Spicy-X',
              type: 'sauce',
              proteins: 30,
              fat: 20,
              carbohydrates: 40,
              calories: 30,
              price: 90,
              image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/sauce-02-large.png',
              __v: 0
            },
            {
              _id: '643d69a5c3f7b9001cfa093c',
              name: 'Краторная булка N-200i',
              type: 'bun',
              proteins: 80,
              fat: 24,
              carbohydrates: 53,
              calories: 420,
              price: 1255,
              image: 'https://code.s3.yandex.net/react/code/bun-02.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/bun-02-large.png',
              __v: 0
            }
          ]
        }
      }
    };
    const newState = ordersSlice.reducer(initialState, action);

    expect(newState).toEqual({
      error: null,
      orderData: {
        _id: '68076a3ee8e61d001cec3ebe',
        status: 'done',
        name: 'Краторный spicy люминесцентный бургер',
        createdAt: '2025-04-22T10:06:54.894Z',
        updatedAt: '2025-04-22T10:06:55.564Z',
        number: 75274,
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa093e',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-03-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa0942',
            name: 'Соус Spicy-X',
            type: 'sauce',
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-02-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0
          }
        ]
      },
      orderRequest: false,
      isModalOpen: false
    });
  });

  test('action: makeOrderBurgerThunk is rejected', () => {
    const action = {
      type: makeOrderBurgerThunk.rejected.type,
      error: { message: 'Error' }
    };
    const newState = ordersSlice.reducer(initialState, action);

    expect(newState).toEqual({
      error: 'Error',
      orderData: null,
      orderRequest: false,
      isModalOpen: false
    });
  });
});
