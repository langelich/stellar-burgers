import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  closeModal,
  selectIngredientsInConstructor,
  selectOrderData,
  selectOrderRequest
} from '../../services/slices/products-slice';
import { makeOrderBurgerThunk } from '../../services/asyncThunks';
import { useNavigate } from 'react-router-dom';
import { selectUserProfile } from '../../services/slices/user-slice';

export const BurgerConstructor: FC = () => {
  const ingredientsInConstructor = useAppSelector(
    selectIngredientsInConstructor
  );
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(selectUserProfile);
  const navigate = useNavigate();

  const constructorItems = {
    bun: ingredientsInConstructor.bun,
    ingredients: ingredientsInConstructor.ingredients
  };

  const orderRequest = useAppSelector(selectOrderRequest);

  const orderModalData = useAppSelector(selectOrderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (userProfile) {
      const idsIngredients = ingredientsInConstructor.ingredients
        .map((item) => item._id)
        .concat(ingredientsInConstructor.bun!._id);
      dispatch(makeOrderBurgerThunk(idsIngredients));
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(closeModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
