import { createContext, appRouter } from '@inform-ag-boilerplate/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { TRPCRequestInfo } from '@trpc/server/unstable-core-do-not-import';

// Using a namespaced router, our trpc endpoints look like: http://localhost:4200/api/{namespace}.{procedure}
const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api',
    req,
    router: appRouter,
    createContext: async () =>
      await createContext({
        req,
        resHeaders: {} as Headers,
        info: {} as TRPCRequestInfo,
      }),
  });
};

export { handler as GET, handler as POST };
