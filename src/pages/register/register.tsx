import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { registerUserThunk } from '../../services/asyncThunks';
import { selectError } from '../../services/slices/user-slice';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    error
      ? error
      : dispatch(
          registerUserThunk({
            name: userName,
            email: email,
            password: password
          })
        );
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
