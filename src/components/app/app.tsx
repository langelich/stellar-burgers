import {
  ConstructorPage,
  Feed,
  NotFound404,
  ForgotPassword,
  Login,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
import { useEffect, useLayoutEffect } from 'react';
import {
  getFeedsThunk,
  getIngredientsThunk,
  getOrdersThunk,
  getUserThunk
} from '../../services/asyncThunks';
import { selectOrders } from '../../services/slices/products-slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { checkUser } from '../../services/slices/user-slice';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();

  const orderData = orders.find((order) => {
    if (order.number === parseInt(location.pathname.slice(6))) {
      return order;
    }
  });

  const userOrderData = orders.find((order) => {
    if (order.number === parseInt(location.pathname.slice(16))) {
      return order;
    }
  });

  const handleClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = getCookie('accessToken');

    dispatch(getIngredientsThunk());
    dispatch(getFeedsThunk());
    if (refreshToken || accessToken) {
      dispatch(getUserThunk());
    } else {
      dispatch(checkUser());
    }
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        {/* PROTECTED  */}
        <Route path='/login' element={<ProtectedRoute onlyUnAuth />}>
          <Route index element={<Login />} />
        </Route>
        <Route path='/register' element={<ProtectedRoute onlyUnAuth />}>
          <Route index element={<Register />} />
        </Route>
        <Route path='/forgot-password' element={<ProtectedRoute onlyUnAuth />}>
          <Route index element={<ForgotPassword />} />
        </Route>
        <Route path='/reset-password' element={<ProtectedRoute onlyUnAuth />}>
          <Route index element={<ResetPassword />} />
        </Route>
        <Route path='/profile' element={<ProtectedRoute />}>
          <Route index element={<Profile />} />
          <Route path='orders' element={<ProfileOrders />} />
          <Route path='orders/:number' element={<OrderInfo />} />
        </Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleClose}>
                <IngredientDetails />{' '}
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title={`#${orderData?.number}`} onClose={handleClose}>
                <OrderInfo />{' '}
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title={`#${userOrderData?.number}`} onClose={handleClose}>
                <OrderInfo />{' '}
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
