<script lang="ts">
  import { createTranslator } from '#/client/i18n/translator';
  import { i18n } from '#/client/store/i18n';
  import type { Ent } from '#/def/entity';
  import { validator } from '@felte/validator-zod';
  import { createForm } from 'felte';
  import { onMount } from 'svelte';
  import { derived } from 'svelte/store';
  import SaveButton from './SaveButton.svelte';
  import { TaskPopUpSchema, type TaskPopUpInput } from './TaskPopUp.type';

  const t = derived(i18n, (v) => createTranslator(v.lang));

  export let task: Ent.Task | null = null;
  export let onSubmit: (values: TaskPopUpInput) => Promise<void>;
  export let onDelete: () => Promise<void> = async () => {};
  export let isDeleting: boolean = false;

  let isSubmitting: boolean = false;

  let titleField: HTMLInputElement | undefined;

  onMount(() => {
    titleField?.focus();
  });

  const { form, isValid } = createForm<TaskPopUpInput>({
    extend: validator({ schema: TaskPopUpSchema }),
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

<form
  use:form
  role="dialog"
  class="fixed left-1/2 top-1/2 flex h-300 w-400 -translate-x-1/2 -translate-y-1/2 flex-col rounded-6 border-2 border-border bg-background p-20"
>
  <input
    bind:this={titleField}
    type="text"
    name="title"
    value={task?.title ?? ''}
    placeholder={$t('board.untitled')}
    class="bg-background text-24 font-medium"
  />
  <textarea
    name="description"
    value={task?.description ?? ''}
    placeholder={$t('board.provide_description')}
    class="w-full grow bg-background text-12 font-light"
  />
  <div class="mt-10 flex justify-end gap-x-4">
    <SaveButton disabled={!$isValid || isSubmitting}>
      {#if isSubmitting}
        {$t('global.saving')}
      {:else if task != null}
        {$t('global.update')}
      {:else}
        {$t('global.create')}
      {/if}
    </SaveButton>
    {#if task != null}
      <SaveButton type="button" disabled={isDeleting} style="outline" on:click={onDelete}>
        {#if isDeleting}
          {$t('global.deleting')}
        {:else}
          {$t('global.delete')}
        {/if}
      </SaveButton>
    {/if}
  </div>
</form>
