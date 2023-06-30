import type { TMod } from './model';

export const sampleTasks: TMod.Task[] = [
  {
    id: 'task-1',
    userId: 'user-1',
    title: 'Task 1',
    description: 'Web development',
    status: 'created',
  },
  {
    id: 'task-2',
    userId: 'user-1',
    title: 'Task 2',
    description: null,
    status: 'created',
  },
  {
    id: 'task-3',
    userId: 'user-1',
    title: 'Task 3',
    description: 'Architecture design',
    status: 'progress',
  },
  {
    id: 'task-4',
    userId: 'user-1',
    title: 'Task 4',
    description: 'Database design',
    status: 'completed',
  },
];
