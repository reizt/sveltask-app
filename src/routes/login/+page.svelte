<script lang="ts">
  import { validator } from '@felte/validator-zod';
  import { createForm } from 'felte';
  import AppSymbol from '../../components/AppSymbol.svelte';
  import { signInFields, signInInputSchema, type SignInInput } from '../../defs/sign-in';

  const onSubmit = (values: SignInInput) => {
    //
  };

  const { form } = createForm<SignInInput>({
    extend: validator({ schema: signInInputSchema }),
    onSubmit,
  });
</script>

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
        name={signInFields.email}
        placeholder="name@example.com"
        class="mb-10 h-40 w-full rounded-12 border-1 border-gray-dd px-12 text-14 outline-2 outline-offset-1 outline-gray-dd focus:outline"
      />
      <button
        type="submit"
        class="h-40 w-full rounded-12 bg-black text-14 text-white outline-2 outline-offset-1 outline-gray-dd hover:bg-gray-32 focus:outline active:outline"
      >
        Sign In With Email
      </button>
    </form>
    <div class="flex justify-center">
      <a href="/register" class="text-14 text-gray-b9 underline hover:text-gray-97">Don't you have an account yet? Register</a>
    </div>
  </div>
</div>
