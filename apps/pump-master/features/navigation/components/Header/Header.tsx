'use client';
import { useSelector } from 'react-redux';
import { LogoutButton } from '../../../auth/components/Logout/LogoutButton';
import { PumpsButton } from '../PumpsButton/PumpsButton';
import { useRouter } from 'next/navigation';
import { RootState } from '../../../../store';

export const Header = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <header className="d-flex align-items-center justify-content-between px-4 py-2 border-bottom mb-4">
      <button
        className="btn btn-link m-0 p-0 text-decoration-none fs-3 fw-bold"
        style={{ color: 'inherit' }}
        onClick={() => router.push('/')}
      >
        {process.env.NEXT_PUBLIC_APP_NAME || 'PumpMaster'}
      </button>
      {isAuthenticated && (
        <div className="d-flex align-items-center">
          <PumpsButton />
          <LogoutButton />
        </div>
      )}
    </header>
  );
};
