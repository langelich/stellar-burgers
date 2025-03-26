import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  selectIsLoading,
  selectUserOrders
} from '../../services/slices/user-slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { Preloader } from '@ui';
import { getOrdersThunk } from '../../services/asyncThunks';

export const ProfileOrders: FC = () => {
  const orders = useAppSelector(selectUserOrders);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);

  return (
    <>
      {' '}
      {isLoading ? (
        <Preloader />
      ) : orders.length !== 0 ? (
        <ProfileOrdersUI orders={orders} />
      ) : (
        <h2>Вы еще не сделали ни одного заказа</h2>
      )}
    </>
  );
};
