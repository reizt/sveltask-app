<script lang="ts">
  import AppSymbol from '#/components/AppSymbol.svelte';
  import RegisterButton from '#/components/RegisterButton.svelte';
  import { logInFields, logInInputSchema, type LogInInput } from '#/defs/log-in';
  import { validator } from '@felte/validator-zod';
  import { createForm } from 'felte';

  const onSubmit = (values: LogInInput) => {
    //
  };

  const { form, isValid } = createForm<LogInInput>({
    extend: validator({ schema: logInInputSchema }),
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
        name={logInFields.email}
        placeholder="name@example.com"
        class="mb-10 h-40 w-full rounded-4 border-1 border-border bg-background px-12 text-14 outline-2 outline-offset-1 outline-border focus:outline"
      />
      <RegisterButton disabled={!isValid}>Sign In With Email</RegisterButton>
    </form>
    <div class="flex justify-center">
      <a href="/register" class="text-14 text-muted underline hover:text-primary">Don't you have an account yet? Register</a>
    </div>
  </div>
</div>
