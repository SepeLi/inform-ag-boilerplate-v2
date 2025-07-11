'use server';

import { createContext } from './context';
import { appRouter } from './router';
import { createCallerFactory } from './trpc';

export const serverClient = async () => {
  const createCaller = createCallerFactory(appRouter);
  return createCaller(await createContext());
};
