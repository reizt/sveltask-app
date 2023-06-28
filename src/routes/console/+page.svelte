<script lang="ts">
  import PopUpMask from '#/components/PopUpMask.svelte';
  import TaskAddButton from '#/components/TaskAddButton.svelte';
  import TaskCard from '#/components/TaskCard.svelte';
  import TaskPopUp from '#/components/TaskPopUp.svelte';
  import { sampleTasks, type Task, type TaskInput, type TaskStatus } from '#/defs/task';
  import { currentUser } from '#/store/current-user';
  import { replaceOne } from '#/utils/replace-one';
  import { sleep } from '#/utils/sleep';
  import type { PageData } from './$types';

  export let data: PageData;
  currentUser.set(data.currentUser);

  // Constants
  const statuses: TaskStatus[] = ['created', 'progress', 'completed'];
  const statusLabels: Record<TaskStatus, string> = {
    created: 'Created',
    progress: 'In Progress',
    completed: 'Completed',
  };

  // States
  let tasks = [...sampleTasks];
  let editingId: string | null = null;
  let addingStatus: TaskStatus | null = null;
  let draggingId: string | null = null;

  // Computed
  $: editingTask = editingId != null ? tasks.find((task) => task.id === editingId) ?? null : null;
  $: tasksByStatus = (() => {
    const map: Record<TaskStatus, Task[]> = {
      created: [],
      progress: [],
      completed: [],
    };
    for (const task of tasks) {
      map[task.status].push(task);
    }
    return map;
  })();

  // Functions
  const openAdd = (status: TaskStatus) => {
    addingStatus = status;
    editingId = null;
  };
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (editingId != null) editingId = null;
      if (addingStatus != null) addingStatus = null;
    }
  };
  const createTask = async (values: TaskInput) => {
    if (addingStatus == null) return;
    const newTask: Task = {
      id: Math.random().toString(36).slice(2),
      status: addingStatus,
      ...values,
    };
    tasks = [...tasks, newTask];
    await sleep(300);
    addingStatus = null;
  };
  const updateTask = async (values: TaskInput) => {
    if (editingTask == null) return;
    const newTask: Task = { ...editingTask, ...values };
    tasks = replaceOne(tasks, 'id', newTask);
    await sleep(300);
    editingId = null;
  };
  const onDrop = (status: TaskStatus) => {
    const draggingTask = tasks.find((task) => task.id === draggingId);
    if (draggingTask == null) return;
    const newTask: Task = { ...draggingTask, status };
    tasks = replaceOne(tasks, 'id', newTask);
  };
</script>

<h1 class="mb-20 text-32 font-bold">Board</h1>
<div class="flex gap-x-24">
  {#each statuses as status (status)}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:dragover|preventDefault on:drop|preventDefault={() => onDrop(status)} class="flex w-240 flex-col gap-y-12">
      <div class="flex items-center justify-between">
        <h2 class="text-16 text-gray-97">{statusLabels[status]}</h2>
        <TaskAddButton on:click={() => openAdd(status)} />
      </div>
      {#each tasksByStatus[status] as task (task.id)}
        <TaskCard {task} on:click={() => (editingId = task.id)} on:dragstart={() => (draggingId = task.id)} />
      {/each}
    </div>
  {/each}
</div>

<svelte:window on:keydown={handleKeydown} />

{#if addingStatus != null}
  <PopUpMask on:click={() => (addingStatus = null)} />
  <TaskPopUp onSubmit={createTask} />
{/if}

{#if editingTask != null}
  <PopUpMask on:click={() => (editingId = null)} />
  <TaskPopUp task={editingTask} onSubmit={updateTask} />
{/if}
