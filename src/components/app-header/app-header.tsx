import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';
import { selectUserProfile } from '../../services/slices/user-slice';

export const AppHeader: FC = () => {
  const user = useAppSelector(selectUserProfile);

  return <AppHeaderUI userName={user?.name} />;
};
