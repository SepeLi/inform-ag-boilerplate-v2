'use client';
import { useDispatch } from 'react-redux';
import { logout } from '../../state/authSlice';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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
