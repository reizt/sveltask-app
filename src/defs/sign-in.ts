import { z } from 'zod';

export const signInInputSchema = z.object({
  email: z.string().email(),
});
export type SignInInput = z.infer<typeof signInInputSchema>;

export const signInFields: Record<keyof SignInInput, keyof SignInInput> = {
  email: 'email',
};
