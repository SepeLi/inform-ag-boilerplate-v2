'use client';

import { FC, ReactNode, useEffect, useState } from 'react';

export interface ISSRBlocker {
  children: ReactNode;
}

export const SSRBlocker: FC<ISSRBlocker> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return children;
};
