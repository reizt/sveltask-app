<script lang="ts">
  import { callApi } from '%c/api';
  import AppSymbol from '%c/components/AppSymbol.svelte';
  import RegisterButton from '%c/components/RegisterButton.svelte';
  import type { InferBody } from '%d/procedure';
  import { AttemptLogin } from '%d/procedures';
  import { validator } from '@felte/validator-zod';
  import { createForm } from 'felte';

  type Input = InferBody<typeof AttemptLogin>;
  const onSubmit = async (values: Input) => {
    try {
      await callApi(AttemptLogin, values);
    } catch (err) {
      //
    }
  };

  const { form, isValid } = createForm<Input>({
    extend: validator({ schema: AttemptLogin.request.body }),
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
      <h1 class="mb-16 text-center text-28 font-bold">Welcome Back</h1>
      <input
        type="email"
        autocomplete="email"
        name="email"
        placeholder="name@example.com"
        class="mb-10 h-40 w-full rounded-4 border-1 border-border bg-background px-12 text-14 outline-2 outline-offset-1 outline-border focus:outline"
      />
      <RegisterButton disabled={!isValid}>Sign In With Email</RegisterButton>
    </form>
    <!-- <div class="flex justify-center">
      <a href="/register" class="text-14 text-muted underline hover:text-primary">Don't you have an account yet? Register</a>
    </div> -->
  </div>
</div>
