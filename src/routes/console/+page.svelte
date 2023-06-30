<script lang="ts">
  import PopUpMask from '%c/components/PopUpMask.svelte';
  import TaskAddButton from '%c/components/TaskAddButton.svelte';
  import TaskCard from '%c/components/TaskCard.svelte';
  import TaskCardSkeleton from '%c/components/TaskCardSkeleton.svelte';
  import TaskPopUp from '%c/components/TaskPopUp.svelte';
  import type { TaskPopUpInput } from '%c/components/TaskPopUp.type';
  import { currentUser } from '%c/store/current-user';
  import type { TMod } from '%d/model';
  import { sampleTasks } from '%d/samples';
  import { replaceOne } from '%u/replace-one';
  import { sleep } from '%u/sleep';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  currentUser.set(data.currentUser);

  // Constants
  const statuses: TMod.Task['status'][] = ['created', 'progress', 'completed'];
  const statusLabels: Record<TMod.Task['status'], string> = {
    created: 'Created',
    progress: 'In Progress',
    completed: 'Completed',
  };

  // States
  let tasks: TMod.Task[] = [...sampleTasks];
  let isLoading: boolean = true;
  let editingId: string | null = null;
  let addingStatus: TMod.Task['status'] | null = null;
  let draggingId: string | null = null;

  onMount(async () => {
    await sleep(500);
    isLoading = false;
  });

  // Computed
  $: editingTask = editingId != null ? tasks.find((task) => task.id === editingId) ?? null : null;
  $: tasksByStatus = (() => {
    const map: Record<TMod.Task['status'], TMod.Task[]> = {
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
  const openAdd = (status: TMod.Task['status']) => {
    addingStatus = status;
    editingId = null;
  };
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (editingId != null) editingId = null;
      if (addingStatus != null) addingStatus = null;
    }
  };
  const createTask = async (values: TaskPopUpInput) => {
    if (addingStatus == null) return;
    const newTask: TMod.Task = {
      id: Math.random().toString(36).slice(2),
      userId: data.currentUser!.id,
      status: addingStatus,
      ...values,
    };
    tasks = [...tasks, newTask];
    await sleep(300);
    addingStatus = null;
  };
  const updateTask = async (values: TaskPopUpInput) => {
    if (editingTask == null) return;
    const newTask: TMod.Task = { ...editingTask, ...values };
    tasks = replaceOne(tasks, 'id', newTask);
    await sleep(300);
    editingId = null;
  };
  const updateTaskStatus = (status: TMod.Task['status']) => {
    const draggingTask = tasks.find((task) => task.id === draggingId);
    if (draggingTask == null) return;
    const newTask: TMod.Task = { ...draggingTask, status };
    tasks = replaceOne(tasks, 'id', newTask);
  };
</script>

<svelte:head>
  <title>Board | TODO APP</title>
</svelte:head>

<div class="mb-20 flex justify-between">
  <h1 class="text-32 font-bold">Board</h1>
  <TaskAddButton on:click={() => openAdd('created')} />
</div>
<div class="flex gap-x-24">
  {#each statuses as status (status)}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:dragover|preventDefault on:drop|preventDefault={() => updateTaskStatus(status)} class="flex w-240 flex-col gap-y-12">
      <div class="flex items-center justify-between">
        <h2 class="text-16 text-muted">{statusLabels[status]}</h2>
      </div>
      {#if isLoading}
        <TaskCardSkeleton />
        <TaskCardSkeleton />
      {:else}
        {#each tasksByStatus[status] as task (task.id)}
          <TaskCard {task} on:click={() => (editingId = task.id)} on:dragstart={() => (draggingId = task.id)} />
        {/each}
      {/if}
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
