'use client';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../state/authSlice';
import { useRouter } from 'next/navigation';
import { RootState } from '../../../../store';

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  if (!isAuthenticated) return null;
  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };
  return (
    <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
      Logout
    </button>
  );
};
