<script lang="ts">
  import type { Ent } from '#/def/entity';
  import AccountPop from './AccountPop.svelte';
  import AppSymbol from './AppSymbol.svelte';
  import LangSwitch from './LangSwitch.svelte';
  import ThemeSwitch from './ThemeSwitch.svelte';

  export let currentUser: Ent.User | null = null;
</script>

<div class="mb-10 flex h-60 items-center gap-x-10 border-b-1 border-border px-40 py-16">
  <a href="/">
    <AppSymbol />
  </a>
  <div class="grow" />
  <LangSwitch />
  <ThemeSwitch />
  {#if currentUser != null}
    <AccountPop />
  {/if}
</div>
