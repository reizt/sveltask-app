<script lang="ts">
  import Header from '#/components/Header.svelte';
  import Nav from '#/components/Nav.svelte';
  import type { User } from '#/defs/user';
  import { currentUserWT } from '#/store/current-user';

  let currentUserValue: User | null = null;

  currentUserWT.subscribe((value) => {
    currentUserValue = value;
  });
</script>

<div class="flex min-h-screen flex-col">
  <Header currentUserWT={currentUserValue} />
  <div class="flex w-full gap-x-30 px-40 pt-30">
    <Nav />
    <main class="grow">
      <slot />
    </main>
  </div>
</div>
