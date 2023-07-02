<script lang="ts">
  import { goto } from '$app/navigation';
  import { callApi } from '%c/api/client-side';
  import { LogOut } from '%d/procedures';

  let showDropdown: boolean = false;

  const dropDownId = 'header-account-drop-down';

  const handleClick = (e: MouseEvent) => {
    const isInside = (e.target as Element).closest(`#${dropDownId}`) != null;
    if (!isInside && showDropdown) {
      showDropdown = false;
    }
  };

  const logOut = async () => {
    await callApi(LogOut, {});
    await goto('/login');
  };
</script>

<svelte:window on:click={handleClick} />

<div id={dropDownId} class="relative">
  <button on:click={() => (showDropdown = true)} class="flex h-40 w-40 items-center justify-center rounded-6 border-1 border-border hover:bg-accent">
    <span class="material-icons text-18">person</span>
  </button>
  {#if showDropdown}
    <div class="absolute right-0 top-50 mt-10 w-140 overflow-hidden rounded-6 border-1 border-border bg-background">
      <a href="/console/settings" class="block px-16 py-10 text-12 hover:bg-accent">Settings</a>
      <button class="block w-full px-16 py-10 text-left text-12 hover:bg-accent" on:click={logOut}>Logout</button>
    </div>
  {/if}
</div>
