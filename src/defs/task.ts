import { z } from 'zod';

export type TaskStatus = 'created' | 'progress' | 'completed';
export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
};
export const taskFields: Record<keyof Task, keyof Task> = {
  id: 'id',
  title: 'title',
  description: 'description',
  status: 'status',
};

export const sampleTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Task 1',
    description: 'Web development',
    status: 'created',
  },
  {
    id: 'task-2',
    title: 'Task 2',
    description: null,
    status: 'created',
  },
  {
    id: 'task-3',
    title: 'Task 3',
    description: 'Architecture design',
    status: 'progress',
  },
  {
    id: 'task-4',
    title: 'Task 4',
    description: 'Database design',
    status: 'completed',
  },
];

export const taskInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable(),
});
export type TaskInput = z.infer<typeof taskInputSchema>;
