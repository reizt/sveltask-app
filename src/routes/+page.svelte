<script lang="ts">
  import TaskCard from './TaskCard.svelte';
  import TaskPopUp from './TaskPopUp.svelte';
  import { sampleTasks, type Task, type TaskStatus } from './task';

  const tasks = sampleTasks;

  // States
  let showingTask: Task | null = null;
  let adding: boolean = false;

  const tasksByStatus: Record<TaskStatus, Task[]> = {
    created: [],
    progress: [],
    completed: [],
  };
  for (const task of tasks) {
    tasksByStatus[task.status].push(task);
  }
  const statuses: TaskStatus[] = ['created', 'progress', 'completed'];
  const statusLabels: Record<TaskStatus, string> = {
    created: 'Created',
    progress: 'In Progress',
    completed: 'Completed',
  };

  const openAdd = (status: TaskStatus) => {
    adding = true;
    showingTask = null;
  };
  const taskOnDragStart = () => {
    //
  };
  const openTask = (task: Task) => {
    showingTask = task;
  };
  const closeTask = () => {
    showingTask = null;
  };
  const handleKeydown = (e: KeyboardEvent) => {
    if (showingTask == null) return;
    if (e.key === 'Escape') {
      closeTask();
    }
  };
</script>

<h1 class="text-32 font-bold mb-30">Current Tasks</h1>
<div class="grid grid-cols-3 gap-x-24">
  {#each statuses as status}
    <div class="flex flex-col gap-y-12">
      <div class="flex items-center justify-between">
        <h2 class="text-16 text-gray-97">{statusLabels[status]}</h2>
        <button
          on:click={() => openAdd(status)}
          class="flex justify-center items-center rounded-full bg-gray-dd hover:bg-gray-b9 focus:bg-gray-b9 duration-150 p-2"
        >
          <span class="material-icons text-gray-60 text-18">add</span>
        </button>
      </div>
      {#each tasksByStatus[status] as task}
        <TaskCard {task} onClick={() => openTask(task)} onDragStart={taskOnDragStart} />
      {/each}
    </div>
  {/each}
</div>

<svelte:window on:keydown={handleKeydown} />
{#if showingTask != null}
  <button class="bg-black bg-opacity-50 block fixed inset-0 cursor-default" on:click={() => closeTask()} />
  <TaskPopUp task={showingTask} />
{/if}

{#if adding}
  <button class="bg-black bg-opacity-50 block fixed inset-0 cursor-default" on:click={() => (adding = false)} />
  <TaskPopUp />
{/if}
