import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { selectIngredients } from '../../services/slices/ingredients';
import { selectOrders } from '../../services/slices/feed';
import { selectUserOrders } from '../../services/slices/user-slice';
import { getFeedsThunk } from '../../services/asyncThunks';

export const OrderInfo: FC = () => {
  const userOrders = useAppSelector(selectUserOrders);
  const orders = useAppSelector(selectOrders);
  const params = useParams();
  const allOrders = [...orders, ...userOrders];
  const dispatch = useAppDispatch();

  const orderData = allOrders.find((order) => {
    if (order.number === parseInt(params.number!)) return order;
  });

  const ingredients = useAppSelector(selectIngredients);

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, []);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
