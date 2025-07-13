'use client';

import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from '@inform-ag-boilerplate-v2/ui';
import {
  Provider as TRPCProvider,
  browserClient as trpc,
} from '@inform-ag-boilerplate-v2/server';
import { setAuth } from '../../state/authSlice';
import { RootState } from '../../../../store';
import { useRouter } from 'next/navigation';

export const LoginComponent = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const loginMutation = trpc.auth.login.useMutation();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    setError(null);
    try {
      const result = await loginMutation.mutateAsync({
        email: values.username,
        password: values.password,
      });
      dispatch(
        setAuth({
          user: { email: values.username },
          token: result.token || '',
        })
      );
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return isAuthenticated ? (
    <div>
      <span>Loading...</span>
    </div>
  ) : (
    <LoginForm
      onSubmit={handleLogin}
      isLoading={loginMutation.isPending}
      error={error || undefined}
    />
  );
};

export const Login: FC = (props) => (
  <TRPCProvider>
    <LoginComponent {...props} />
  </TRPCProvider>
);
