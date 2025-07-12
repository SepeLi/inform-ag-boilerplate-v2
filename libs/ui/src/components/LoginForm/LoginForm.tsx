'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      className="w-100"
      style={{ maxWidth: 400, margin: '0 auto' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-center mb-4">Welcome back</h2>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <Input
          {...register('username')}
          placeholder="Enter your username"
          error={!!errors.username}
          errorMessage={errors.username?.message}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <Input
          {...register('password')}
          type="password"
          placeholder="Enter your password"
          error={!!errors.password}
          errorMessage={errors.password?.message}
          className="form-control"
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <Button
        type="submit"
        variant="primary"
        size="md"
        fullWidth
        isLoading={isLoading}
        className="mb-2"
      >
        Log in
      </Button>
      <div className="text-center mt-2">
        <small>Don't have an account? Register</small>
      </div>
    </form>
  );
};

export default LoginForm;
