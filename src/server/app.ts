import { createApp } from './core/app';
import { initContext } from './service/config';

const ctx = initContext();
export const app = createApp(ctx);
