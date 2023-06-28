<script lang="ts">
  import { validator } from '@felte/validator-zod';
  import { createForm } from 'felte';
  import { onMount } from 'svelte';
  import { taskFields, taskInputSchema, type Task, type TaskInput } from '../defs/task';
  import SaveButton from './SaveButton.svelte';

  export let task: Task | undefined = undefined;
  export let onSubmit: (values: TaskInput) => Promise<void>;

  let isSubmitting: boolean = false;

  let titleField: HTMLInputElement | undefined;

  onMount(() => {
    titleField?.focus();
  });

  const { form, isValid } = createForm<TaskInput>({
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

<form use:form role="dialog" class="fixed left-1/2 top-1/2 flex h-300 w-400 -translate-x-1/2 -translate-y-1/2 flex-col rounded-20 bg-white p-20">
  <input bind:this={titleField} type="text" name={taskFields.title} value={task?.title ?? ''} placeholder="Untitled" class="text-24" />
  <textarea name={taskFields.description} value={task?.description ?? ''} placeholder="Provide description..." class="w-full grow text-12 font-light" />
  <div class="mt-10 flex justify-end">
    <SaveButton disabled={!$isValid || isSubmitting}>
      {isSubmitting ? 'Saving...' : task != null ? 'Update' : 'Create'}
    </SaveButton>
  </div>
</form>
