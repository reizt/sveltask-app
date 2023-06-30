import { z } from 'zod';

export const val_id = z.string().regex(/^[a-zA-Z0-9_-]{8}$/);
