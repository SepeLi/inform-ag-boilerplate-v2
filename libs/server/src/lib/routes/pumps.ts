import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import {
  getPumps,
  createPump,
  updatePump,
  deletePump,
  getPumpById,
} from '@inform-ag-boilerplate-v2/procedures';

const pumpSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  area: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  flowRate: z.string(),
  offset: z.string(),
  currentPressure: z.string(),
  minPressure: z.string(),
  maxPressure: z.string(),
});

export const pumpRouter = router({
  getAllPumps: publicProcedure.query(() => getPumps()),
  createPump: publicProcedure
    .input(pumpSchema.omit({ id: true }))
    .mutation(({ input }) => createPump(input)),
  updatePump: publicProcedure.input(pumpSchema).mutation(updatePump),
  deletePump: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(deletePump),
  getPumpById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(getPumpById),
});
