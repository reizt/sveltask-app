<script lang="ts">
  import Header from '#/components/Header.svelte';
  import Nav from '#/components/Nav.svelte';
  import { currentUser } from '#/store/current-user';
</script>

<div class="flex min-h-screen flex-col">
  <Header currentUser={$currentUser} />
  <div class="flex w-full gap-x-30 px-40 pt-30">
    <Nav />
    <main class="grow">
      <slot />
    </main>
  </div>
</div>
