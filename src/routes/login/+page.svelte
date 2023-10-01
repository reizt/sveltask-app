<script lang="ts">
  import { callApi } from '#/client/api';
  import AppSymbol from '#/client/components/AppSymbol.svelte';
  import HeadTitle from '#/client/components/HeadTitle.svelte';
  import RegisterButton from '#/client/components/RegisterButton.svelte';
  import { createTranslator } from '#/client/i18n/translator';
  import { i18n } from '#/client/store/i18n';
  import { LogIn } from '#/def/export-endpoints';
  import type { InferBody } from '#/def/lib/endpoint';
  import { goto } from '$app/navigation';
  import { validator } from '@felte/validator-zod';
  import { createForm } from 'felte';
  import { derived } from 'svelte/store';

  const t = derived(i18n, (v) => createTranslator(v.lang));

  type Input = InferBody<typeof LogIn>;

  let isSubmitting = false;

  const onSubmit = async (values: Input) => {
    isSubmitting = true;
    try {
      await callApi(LogIn, values);
      await goto('/console');
    } catch (err) {
      console.log(err);
    } finally {
      isSubmitting = false;
    }
  };

  const { form, isValid } = createForm<Input>({
    extend: validator({ schema: LogIn.request.body }),
    onSubmit,
  });
</script>

<HeadTitle title={$t('login.title')} />

<div class="flex h-screen-y items-center justify-center">
  <div class="w-300 pb-100">
    <form use:form class="mb-20">
      <a href="/" class="mb-30 flex justify-center">
        <AppSymbol />
      </a>
      <h1 class="mb-16 text-center text-28 font-bold">{$t('login.welcome_back')}</h1>
      <input
        type="email"
        autocomplete="email"
        name="email"
        placeholder="name@example.com"
        class="mb-10 h-40 w-full rounded-4 border-1 border-border bg-background px-12 text-14 outline-2 outline-offset-1 outline-outline focus:outline"
      />
      <input
        type="password"
        autocomplete="current-password"
        name="password"
        placeholder="password"
        class="mb-10 h-40 w-full rounded-4 border-1 border-border bg-background px-12 text-14 outline-2 outline-offset-1 outline-outline focus:outline"
      />
      <div class="flex justify-end mb-10">
        <a href="/login/email" class="text-12 text-primary hover:opacity-75">{$t('login.forgot_password')}</a>
      </div>
      <RegisterButton disabled={!$isValid || isSubmitting} loading={isSubmitting}>{$t('login.login')}</RegisterButton>
    </form>
  </div>
</div>
