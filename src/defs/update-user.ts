import { z } from 'zod';

export const updateCurrentUserInputSchema = z.object({
  name: z.string().min(1),
});
export type UpdateCurrentUserInput = z.infer<typeof updateCurrentUserInputSchema>;

export const updateCurrentUserFields: Record<keyof UpdateCurrentUserInput, keyof UpdateCurrentUserInput> = {
  name: 'name',
};
