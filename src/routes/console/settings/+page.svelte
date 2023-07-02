<script lang="ts">
  import { callApi } from '%c/api';
  import { currentUser } from '%c/store/current-user';
  import type { InferBody } from '%d/procedure';
  import { UpdateCurrentUser } from '%d/procedures';
  import { validator } from '@felte/validator-zod';
  import { createForm } from 'felte';
  import type { PageData } from './$types';

  export let data: PageData;
  currentUser.set(data.currentUser);

  let isSubmitting: boolean = false;

  type Input = InferBody<typeof UpdateCurrentUser>;

  const onSubmit = async (values: Input) => {
    isSubmitting = true;
    const newUser = await callApi(UpdateCurrentUser, {
      name: values.name,
    });
    currentUser.update(() => newUser);
    isSubmitting = false;
    setIsDirty(false);
  };

  const { form, isValid, isDirty, setIsDirty } = createForm<Input>({
    extend: validator({ schema: UpdateCurrentUser.request.body }),
    onSubmit,
  });
</script>

<svelte:head>
  <title>Settings | TODO APP</title>
</svelte:head>

<h1 class="text-32 font-bold">Settings</h1>

<form use:form>
  <div class="mb-16">
    <h2 class="mb-6 text-18 font-medium">Your Name</h2>
    <input
      type="text"
      name="name"
      value={$currentUser?.name}
      class="mb-10 h-40 w-full max-w-300 rounded-4 border-1 border-border bg-background px-12 text-14 outline-2 outline-offset-1 outline-outline focus:outline"
    />
  </div>
  <button
    type="submit"
    disabled={!$isDirty || !$isValid || isSubmitting}
    class="h-40 w-100 rounded-4 bg-primary text-14 text-secondary outline-2 outline-offset-1 outline-outline hover:bg-primary/80 focus:outline active:outline disabled:bg-primary/80"
  >
    {#if isSubmitting}
      Saving...
    {:else}
      Save
    {/if}
  </button>
</form>
