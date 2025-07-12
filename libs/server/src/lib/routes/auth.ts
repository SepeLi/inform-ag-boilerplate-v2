import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import {
  loginValidation,
  registerValidation,
} from '@inform-ag-boilerplate-v2/procedures';

export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.email(), password: z.string().min(6) }))
    .mutation(
      async ({ input }: { input: { email: string; password: string } }) => {
        return loginValidation({ input });
      }
    ),
  register: publicProcedure
    .input(
      z.object({
        email: z.email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
      })
    )
    .mutation(
      async ({
        input,
      }: {
        input: { email: string; password: string; confirmPassword: string };
      }) => {
        return registerValidation({ input });
      }
    ),
});
