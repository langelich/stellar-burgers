import React, { FC } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorElement, Modal } from '@components';
import { Preloader, OrderDetailsUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import productsSlice, {
  addIngredientsInConstructor,
  selectIsModalOpen
} from '../../..//services/slices/products-slice';
import { useDrop } from 'react-dnd';
// import { useSelector } from '../../services/store';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  onOrderClick,
  closeOrderModal
}) => {
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const dispatch = useAppDispatch();
  const [, dropTarget] = useDrop({
    accept: 'drag_ingredient_in_constructor',
    drop: (item: TIngredient) => {
      dispatch(addIngredientsInConstructor(item));
    }
  });

  return (
    <>
      <section className={styles.burger_constructor} ref={dropTarget}>
        {constructorItems.bun ? (
          <div className={`${styles.element} mb-4 mr-4`}>
            <ConstructorElement
              type='top'
              isLocked
              text={`${constructorItems.bun.name} (верх)`}
              price={constructorItems.bun.price}
              thumbnail={constructorItems.bun.image}
            />
          </div>
        ) : (
          <div
            className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}
          >
            Выберите булки
          </div>
        )}
        <ul className={styles.elements}>
          {constructorItems.ingredients.length > 0 ? (
            constructorItems.ingredients.map(
              (item: TConstructorIngredient, index: number) => (
                <BurgerConstructorElement
                  ingredient={item}
                  index={index}
                  totalItems={constructorItems.ingredients.length}
                  key={index}
                />
              )
            )
          ) : (
            <div
              className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}
            >
              Выберите начинку
            </div>
          )}
        </ul>
        {constructorItems.bun ? (
          <div className={`${styles.element} mt-4 mr-4`}>
            <ConstructorElement
              type='bottom'
              isLocked
              text={`${constructorItems.bun.name} (низ)`}
              price={constructorItems.bun.price}
              thumbnail={constructorItems.bun.image}
            />
          </div>
        ) : (
          <div
            className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
          >
            Выберите булки
          </div>
        )}
        <div className={`${styles.total} mt-10 mr-4`}>
          <div className={`${styles.cost} mr-10`}>
            <p className={`text ${styles.text} mr-2`}>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          {constructorItems.bun && constructorItems.ingredients.length ? (
            <Button
              htmlType='button'
              type='primary'
              size='large'
              children='Оформить заказ'
              onClick={onOrderClick}
            />
          ) : (
            <Button
              htmlType='button'
              type='primary'
              size='large'
              children='Оформить заказ'
              onClick={onOrderClick}
              disabled
            />
          )}
        </div>

        {orderRequest && isModalOpen && (
          <Modal onClose={closeOrderModal} title={'Оформляем заказ...'}>
            <Preloader />
          </Modal>
        )}

        {orderModalData && isModalOpen && (
          <Modal
            onClose={closeOrderModal}
            title={orderRequest ? 'Оформляем заказ...' : ''}
          >
            <OrderDetailsUI orderNumber={orderModalData.number} />
          </Modal>
        )}
      </section>
    </>
  );
};
