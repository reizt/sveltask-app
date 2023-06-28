<script lang="ts">
  import type { User } from '#/defs/user';
  import AppSymbol from './AppSymbol.svelte';

  export let currentUser: User | null = null;

  let showDropdown: boolean = false;

  const dropDownId = 'header-drop-down';

  const handleClick = (e: MouseEvent) => {
    const isInside = (e.target as Element).closest(`#${dropDownId}`) != null;
    if (!isInside && showDropdown) {
      showDropdown = false;
    }
  };
</script>

<svelte:window on:click={handleClick} />

<div class="mb-10 flex h-60 items-center justify-between border-b-1 border-gray-dd px-40 py-16">
  <a href="/">
    <AppSymbol />
  </a>
  {#if currentUser != null}
    <div id={dropDownId} class="relative">
      <a href="/console/settings" class="flex h-40 w-40 items-center justify-center rounded-10 border-1 border-gray-dd hover:bg-gray-f0">
        <span class="material-icons">image</span>
      </a>
    </div>
  {/if}
</div>
