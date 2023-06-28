import { z } from 'zod';

export const logInInputSchema = z.object({
  email: z.string().email(),
});
export type LogInInput = z.infer<typeof logInInputSchema>;

export const logInFields: Record<keyof LogInInput, keyof LogInInput> = {
  email: 'email',
};
