<script lang="ts">
  import Header from '#/components/Header.svelte';
  import Nav from '#/components/Nav.svelte';
  import type { User } from '#/defs/user';
  import { currentUser } from '#/store/current-user';
  import './styles.css';

  let currentUserValue: User | null = null;

  currentUser.subscribe((value) => {
    currentUserValue = value;
  });
</script>

<div class="flex min-h-screen flex-col">
  <Header currentUser={currentUserValue} />
  <div class="flex w-full gap-x-30 px-40 pt-30">
    <Nav />
    <main class="grow">
      <slot />
    </main>
  </div>
</div>
