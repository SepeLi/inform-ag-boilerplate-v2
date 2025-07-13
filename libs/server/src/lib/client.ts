'use client';

import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from './router';

export const browserClient = createTRPCReact<AppRouter>({
  abortOnUnmount: true,
});
