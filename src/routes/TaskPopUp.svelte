<script lang="ts">
  import { validator } from '@felte/validator-zod';
  import { createForm } from 'felte';
  import { onMount } from 'svelte';
  import SaveButton from './SaveButton.svelte';
  import { taskFields, taskInputSchema, type Task, type TaskInput } from './task';

  export let task: Task | undefined = undefined;
  export let onSubmit: (values: TaskInput) => Promise<void>;

  let isSubmitting: boolean = false;

  let titleField: HTMLInputElement | undefined;

  onMount(() => {
    titleField?.focus();
  });

  const { form } = createForm<TaskInput>({
    extend: validator({ schema: taskInputSchema }),
    onSubmit: async (values) => {
      isSubmitting = true;
      await onSubmit(values);
    },
    onSuccess: () => {
      isSubmitting = false;
    },
    onError: () => {
      isSubmitting = false;
    },
  });
</script>

<form use:form role="dialog" class="flex flex-col w-400 h-300 p-20 bg-white rounded-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
  <input bind:this={titleField} type="text" name={taskFields.title} value={task?.title ?? ''} placeholder="Untitled" class="text-24" />
  <textarea name={taskFields.description} value={task?.description ?? ''} placeholder="Provide description..." class="text-12 font-light w-full grow" />
  <div class="flex justify-end mt-10">
    <SaveButton>
      {isSubmitting ? 'Saving...' : task != null ? 'Update' : 'Create'}
    </SaveButton>
  </div>
</form>
