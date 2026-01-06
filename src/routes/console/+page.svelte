<script lang="ts">
  import { callApi } from '#/client/api';
  import HeadTitle from '#/client/components/HeadTitle.svelte';
  import PopUpMask from '#/client/components/PopUpMask.svelte';
  import TaskAddButton from '#/client/components/TaskAddButton.svelte';
  import TaskCard from '#/client/components/TaskCard.svelte';
  import TaskCardSkeleton from '#/client/components/TaskCardSkeleton.svelte';
  import TaskPopUp from '#/client/components/TaskPopUp.svelte';
  import type { TaskPopUpInput } from '#/client/components/TaskPopUp.type';
  import { createTranslator } from '#/client/i18n/translator';
  import { currentUser } from '#/client/store/current-user';
  import { i18n } from '#/client/store/i18n';
  import { CreateTask } from '#/def/endpoint/CreateTask';
  import { DeleteTask } from '#/def/endpoint/DeleteTask';
  import { GetTasks } from '#/def/endpoint/GetTasks';
  import { UpdateTask } from '#/def/endpoint/UpdateTask';
  import type { Ent } from '#/def/entity';
  import { replaceOne } from '#/utils/replace-one';
  import { onDestroy, onMount } from 'svelte';
  import { derived } from 'svelte/store';
  import type { PageData } from './$types';

  const t = derived(i18n, (v) => createTranslator(v.lang));

  export let data: PageData;
  currentUser.set(data.currentUser);

  // Constants
  $: statuses = ['created', 'progress', 'completed'] satisfies Ent.Task['status'][];
  $: statusLabels = {
    created: $t('enum.task_status.created'),
    progress: $t('enum.task_status.progress'),
    completed: $t('enum.task_status.completed'),
  } satisfies Record<Ent.Task['status'], string>;

  // States
  let tasks: Ent.Task[] = [];
  let isLoading: boolean = true;
  let editingId: string | null = null;
  let addingStatus: Ent.Task['status'] | null = null;
  let draggingId: string | null = null;
  let deletingTaskIds: string[] = [];
  let isDeleting: boolean = false;

  const makeTaskElementId = (task: Ent.Task) => `task-${task.id}`;

  const keydownHandler = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'n') {
      openAdd('created');
    }
  };
  onMount(async () => {
    tasks = await callApi(GetTasks, {});
    isLoading = false;

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', keydownHandler);
    }
  });
  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', keydownHandler);
    }
  });

  // Computed
  $: editingTask = editingId != null ? (tasks.find((task) => task.id === editingId) ?? null) : null;
  $: tasksByStatus = (() => {
    const map: Record<Ent.Task['status'], Ent.Task[]> = {
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
  const openAdd = (status: Ent.Task['status']) => {
    addingStatus = status;
    editingId = null;
  };
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (editingId != null) {
        editingId = null;
        document.getElementById(makeTaskElementId(editingTask!))?.focus();
      }
      if (addingStatus != null) addingStatus = null;
    }
  };
  const createTask = async (values: TaskPopUpInput) => {
    if (addingStatus == null) return;
    const newTask = await callApi(CreateTask, {
      title: values.title,
      description: values.description,
      status: addingStatus,
    });
    tasks = [...tasks, newTask];
    addingStatus = null;
    window.setTimeout(() => document.getElementById(makeTaskElementId(newTask))?.focus(), 0); // wait for DOM update
  };
  const updateTask = async (values: TaskPopUpInput) => {
    if (editingTask == null) return;
    const newTask = await callApi(UpdateTask, {
      id: editingTask.id,
      title: values.title,
      description: values.description,
      status: editingTask.status,
    });
    tasks = replaceOne(tasks, 'id', newTask);
    editingId = null;
    window.setTimeout(() => document.getElementById(makeTaskElementId(newTask))?.focus(), 0); // wait for DOM update
  };
  const updateTaskStatus = async (status: Ent.Task['status']) => {
    const draggingTask = tasks.find((task) => task.id === draggingId);
    if (draggingTask == null) return;
    const newTask: Ent.Task = { ...draggingTask, status };
    tasks = replaceOne(tasks, 'id', newTask);
    await callApi(UpdateTask, { id: draggingTask.id, status });
  };
  const deleteTask = async () => {
    if (editingTask == null) return;
    isDeleting = true;
    deletingTaskIds = [...deletingTaskIds, editingTask.id];
    await callApi(DeleteTask, { id: editingTask.id });
    tasks = tasks.filter((task) => task.id !== editingTask!.id);
    editingId = null;
    isDeleting = false;
    deletingTaskIds = deletingTaskIds.filter((id) => id !== editingTask!.id);
  };
  const deleteTaskById = async (id: string) => {
    deletingTaskIds = [...deletingTaskIds, id];
    tasks = tasks.filter((task) => task.id !== id);
    await callApi(DeleteTask, { id });
    deletingTaskIds = deletingTaskIds.filter((taskId) => taskId !== id);
  };
</script>

<HeadTitle title={$t('board.title')} />

<div class="mb-20 flex justify-between">
  <h1 class="text-32 font-bold">{$t('board.title')}</h1>
  <TaskAddButton
    on:click={() => {
      openAdd('created');
    }}
  />
</div>
<div class="flex gap-x-24">
  {#each statuses as status (status)}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      on:dragover|preventDefault
      on:drop|preventDefault={async () => {
        await updateTaskStatus(status);
      }}
      class="flex w-240 flex-col gap-y-12"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-16 text-muted">{statusLabels[status]}</h2>
      </div>
      {#if isLoading}
        <TaskCardSkeleton />
        <TaskCardSkeleton />
      {:else}
        {#each tasksByStatus[status] as task (task.id)}
          <TaskCard
            id={makeTaskElementId(task)}
            isDeleting={deletingTaskIds.includes(task.id)}
            {task}
            on:click={() => (editingId = task.id)}
            on:dragstart={() => (draggingId = task.id)}
            on:keydown={(e) => {
              console.log(e.key);
              if (e.key === 'Backspace') {
                deleteTaskById(task.id);
              }
            }}
          />
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
  <TaskPopUp task={editingTask} {isDeleting} onSubmit={updateTask} onDelete={deleteTask} />
{/if}
