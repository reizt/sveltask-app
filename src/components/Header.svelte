<script lang="ts">
  import type { User } from '../defs/user';
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

<div class="mb-10 flex h-40 justify-between">
  <a href="/">
    <AppSymbol />
  </a>
  {#if currentUser != null}
    <div id={dropDownId} class="relative">
      <button type="button" on:click={() => (showDropdown = true)} class="flex h-40 w-40 items-center justify-center rounded-12 shadow-land hover:bg-gray-dd">
        <span class="material-icons">image</span>
      </button>
      {#if showDropdown}
        <div class="absolute right-0 top-50 block w-200 rounded-12 bg-white p-12 shadow-land">
          <div class="flex justify-between">
            <div class="grow">
              <h2 class="text-16 text-gray-97">{currentUser.name}</h2>
            </div>
            <a href="/login" class="flex h-32 w-32 items-center justify-center rounded-10 bg-white hover:bg-gray-dd">
              <span class="material-icons text-18">logout</span>
            </a>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>
