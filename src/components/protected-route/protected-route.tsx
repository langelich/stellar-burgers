import { Navigate, useLocation } from 'react-router-dom';
import {
  selectIsUserChecked,
  selectUserProfile
} from '../../services/slices/user-slice';
import { useAppSelector } from '../../services/store';
import { Preloader } from '@ui';
import { ReactNode } from 'react';

export type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactNode;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isUserChecked = useAppSelector(selectIsUserChecked);
  const userProfile = useAppSelector(selectUserProfile);
  const location = useLocation();

  if (!isUserChecked) {
    return <Preloader />;
  }

  if (!userProfile && !onlyUnAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (userProfile && onlyUnAuth) {
    const from = location.state?.from || { pathname: '/' };

    return (
      <Navigate
        replace
        to={from}
        state={{ background: from?.state?.background }}
      />
    );
  }

  return children;
};
