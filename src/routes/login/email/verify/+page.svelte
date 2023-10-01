<script lang="ts">
  import { callApi } from '#/client/api';
  import AppSymbol from '#/client/components/AppSymbol.svelte';
  import HeadTitle from '#/client/components/HeadTitle.svelte';
  import RegisterButton from '#/client/components/RegisterButton.svelte';
  import { createTranslator } from '#/client/i18n/translator';
  import { i18n } from '#/client/store/i18n';
  import { VerifyCode } from '#/def/endpoint/VerifyCode';
  import type { InferBody } from '#/def/lib/endpoint';
  import { goto } from '$app/navigation';
  import { validator } from '@felte/validator-zod';
  import { createForm } from 'felte';
  import { derived } from 'svelte/store';

  const t = derived(i18n, (v) => createTranslator(v.lang));

  type Input = InferBody<typeof VerifyCode>;

  let isSubmitting = false;

  const onSubmit = async (values: Input) => {
    isSubmitting = true;
    try {
      await callApi(VerifyCode, values);
      await goto('/password');
    } catch (err) {
      console.log(err);
    } finally {
      isSubmitting = false;
    }
  };

  const { form, isValid } = createForm<Input>({
    extend: validator({ schema: VerifyCode.request.body }),
    onSubmit,
  });
</script>

<HeadTitle title={$t('login.verify.title')} />

<div class="flex h-screen-y items-center justify-center">
  <div class="w-300 pb-100">
    <form use:form class="mb-20">
      <a href="/" class="mb-30 flex justify-center">
        <AppSymbol />
      </a>
      <h1 class="mb-16 text-center text-28 font-bold">{$t('login.verify.enter_code')}</h1>
      <input
        type="text"
        autocomplete="one-time-code"
        name="code"
        placeholder={$t('login.verify.six_digit_code')}
        class="mb-10 h-40 w-full rounded-4 border-1 border-border bg-background px-12 text-14 outline-2 outline-offset-1 outline-outline focus:outline"
      />
      <RegisterButton disabled={!$isValid || isSubmitting} loading={isSubmitting}>{$t('login.verify.verify')}</RegisterButton>
    </form>
  </div>
</div>
