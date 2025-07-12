'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RootState } from '../store';

export default function HomePage() {
  const auth = useSelector((state: RootState) => state.auth);
  console.warn(auth);
  const router = useRouter();
  const { isAuthenticated } = auth;

  useEffect(() => {
    if (!isAuthenticated) {
      console.warn('not authenticated');
      // router.replace('/login'); // Adjust the path if your login page is elsewhere
    }
  }, [isAuthenticated, router]);

  // Optionally render nothing or a loading spinner while redirecting
  if (!isAuthenticated) return null;

  return (
    <div>
      {/* Your protected page content here */}
      <h1>Welcome! You are logged in.</h1>
    </div>
  );
}
