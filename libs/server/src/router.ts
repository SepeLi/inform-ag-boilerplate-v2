import { authRouter, pumpRouter } from './routes';
import { router } from './trpc';

export const appRouter = router({
  auth: authRouter,
  pumps: pumpRouter,
});

export type AppRouter = typeof appRouter;
