'use client';
import { useRouter } from 'next/navigation';

export const PumpsButton = () => {
  const router = useRouter();
  return (
    <button
      className="btn btn-outline-primary me-3"
      onClick={() => router.push('/pumps')}
    >
      Pumps
    </button>
  );
};
