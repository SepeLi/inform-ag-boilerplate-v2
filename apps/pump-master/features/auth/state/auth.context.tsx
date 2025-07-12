'use client';

import { RootState } from '../../../store';
import { logout } from './authSlice';
import { FC, ReactNode, createContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

export interface AuthContextProps {
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  logout: () => undefined,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // const [, , removeCookie] = useCookies(['jwt']);
  const { user } = useSelector(({ auth }: RootState) => auth);

  const dispatch = useDispatch();

  const logout = async () => {
    // removeCookie('jwt', {
    //   path: '/',
    // });
    // await dispatch(logout());
  };

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
};
