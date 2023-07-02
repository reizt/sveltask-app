<script lang="ts">
  import { goto } from '$app/navigation';
  import { callApi } from '%c/api';
  import AppSymbol from '%c/components/AppSymbol.svelte';
  import RegisterButton from '%c/components/RegisterButton.svelte';
  import type { InferBody } from '%d/procedure';
  import { VerifyLogin } from '%d/procedures';
  import { validator } from '@felte/validator-zod';
  import { createForm } from 'felte';

  type Input = InferBody<typeof VerifyLogin>;

  let isSubmitting = false;

  const onSubmit = async (values: Input) => {
    isSubmitting = true;
    try {
      await callApi(VerifyLogin, values);
    } catch (err) {
      console.log(err);
      return;
    } finally {
      isSubmitting = false;
    }
    await goto('/console');
  };

  const { form, isValid } = createForm<Input>({
    extend: validator({ schema: VerifyLogin.request.body }),
    onSubmit,
  });
</script>

<svelte:head>
  <title>Log In | TODO APP</title>
</svelte:head>

<div class="flex h-screen-y items-center justify-center">
  <div class="w-300 pb-100">
    <form use:form class="mb-20">
      <a href="/" class="mb-30 flex justify-center">
        <AppSymbol />
      </a>
      <h1 class="mb-16 text-center text-28 font-bold">Enter Code</h1>
      <input
        type="text"
        autocomplete="one-time-code"
        name="code"
        placeholder="6 digit code"
        class="mb-10 h-40 w-full rounded-4 border-1 border-border bg-background px-12 text-14 outline-2 outline-offset-1 outline-outline focus:outline"
      />
      <RegisterButton disabled={!$isValid || isSubmitting} loading={isSubmitting}>Verify</RegisterButton>
    </form>
  </div>
</div>
