<script lang="ts">
  import Header from '#/client/components/Header.svelte';
  import Nav from '#/client/components/Nav.svelte';
  import { currentUser } from '#/client/store/current-user';
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
