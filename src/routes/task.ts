export type TaskStatus = 'created' | 'progress' | 'completed';
export type Task = {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
};

export const sampleTasks: Task[] = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Web development',
    status: 'created',
  },
  {
    id: 2,
    title: 'Task 2',
    status: 'created',
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Architecture design',
    status: 'progress',
  },
  {
    id: 4,
    title: 'Task 4',
    description: 'Database design',
    status: 'completed',
  },
];
