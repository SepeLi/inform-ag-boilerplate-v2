'use client';

import { RootState } from '../../../store';
import { FC, ReactNode, createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';

export interface AuthContextProps {
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  logout: () => undefined,
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!isAuthenticated && pathname !== '/login') {
      router.replace('/login');
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated && pathname !== '/login') {
    return (
      <div
        style={{ minHeight: '100vh' }}
        className="d-flex justify-content-center align-items-center"
      >
        Loading...
      </div>
    );
  }
  return <>{children}</>;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // const [, , removeCookie] = useCookies(['jwt']);
  // const { user } = useSelector(({ auth }: RootState) => auth);

  // const dispatch = useDispatch();

  const logout = async () => {
    // removeCookie('jwt', {
    //   path: '/',
    // });
    // await dispatch(logout());
  };

  return (
    <AuthContext.Provider value={{ logout }}>
      <AuthGuard>{children}</AuthGuard>
    </AuthContext.Provider>
  );
};
