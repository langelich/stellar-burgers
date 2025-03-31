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
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useMatch
} from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
import { useEffect } from 'react';
import {
  getIngredientsThunk,
  getOrdersThunk,
  getUserThunk
} from '../../services/asyncThunks';
import { useAppDispatch } from '../../services/store';
import { checkUser } from '../../services/slices/user-slice';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  const feedMatch = useMatch('feed/:number')?.params.number;
  const orderMatch = useMatch('profile/orders/:number')?.params.number;

  const handleClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = getCookie('accessToken');

    dispatch(getIngredientsThunk());

    if (refreshToken || accessToken) {
      dispatch(getUserThunk());
    } else {
      dispatch(checkUser());
    }
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <div className={`${styles.detailPageWrap}`}>
              <p
                className={`text text_type_digits-default ${styles.detailHeader}`}
              >
                {'#' + feedMatch}
              </p>
              <OrderInfo />
            </div>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <h3
                className={`${styles.detailHeader} text text_type_main-large`}
              >
                Детали ингредиента
              </h3>
              <IngredientDetails />
            </div>
          }
        />
        {/* PROTECTED  */}
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              {' '}
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              {' '}
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              {' '}
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              {' '}
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />{' '}
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <div className={`${styles.detailPageWrap}`}>
                <p
                  className={`text text_type_digits-default ${styles.detailHeader}`}
                >
                  {'#' + orderMatch}
                </p>
                <OrderInfo />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
      {background && (
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
              <Modal title={'#' + feedMatch} onClose={handleClose}>
                <OrderInfo />{' '}
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={'#' + orderMatch}
                  onClose={() => navigate('/profile/orders')}
                >
                  <OrderInfo />{' '}
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
