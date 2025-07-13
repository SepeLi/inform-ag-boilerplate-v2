'use client';

import { RootState } from '../../../store';
import { FC, ReactNode, createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { logout, refreshSession } from '../state/authSlice';

export interface AuthContextProps {
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  logout: () => undefined,
});

interface AuthProviderProps {
  children: ReactNode;
}

const EXPIRE_TIME =
  (Number(process.env.NEXT_PUBLIC_SESSION_EXPIRY_HOURS) || 1) * 60 * 60 * 1000;

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const { _persistedAt: persistedAt, isAuthenticated } = auth;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 1. Check for session expiry
    if (isAuthenticated && persistedAt) {
      const expired = Date.now() - persistedAt > EXPIRE_TIME;
      if (expired) {
        dispatch(logout());
        return;
      }
    }

    // 2. Redirect to login if not authenticated
    if (!isAuthenticated && pathname !== '/login') {
      router.replace('/login');
      return;
    }

    // 3. Refresh session if authenticated
    if (isAuthenticated) {
      dispatch(refreshSession());
    }
  }, [pathname, isAuthenticated, persistedAt, dispatch, router]);

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
