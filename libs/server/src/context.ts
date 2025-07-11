import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export const createContext = async (opts?: FetchCreateContextFnOptions) => {
  // You can add any other context here
  // The request is available as `opts.req`
  // And response headers can be set with `opts.resHeaders.set(...)`
  return { ...opts };
};

export type TRPCContext = Awaited<typeof createContext>;
