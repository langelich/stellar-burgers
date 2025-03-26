import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {
  selectIsUserChecked,
  selectUserProfile
} from '../../services/slices/user-slice';
import { useAppSelector } from '../../services/store';
import { Preloader } from '@ui';

export type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ onlyUnAuth }: ProtectedRouteProps) => {
  const isUserChecked = useAppSelector(selectIsUserChecked);
  const userProfile = useAppSelector(selectUserProfile);
  const location = useLocation();

  if (!isUserChecked) {
    return <Preloader />;
  }

  if (!userProfile && !onlyUnAuth) {
    return <Navigate replace to='/login' />;
  }

  if (userProfile && onlyUnAuth) {
    return <Navigate replace to='/profile' />;
  }

  return <Outlet />;
};
