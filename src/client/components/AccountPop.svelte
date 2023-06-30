<script lang="ts">
  let showDropdown: boolean = false;

  const dropDownId = 'header-account-drop-down';

  const handleClick = (e: MouseEvent) => {
    const isInside = (e.target as Element).closest(`#${dropDownId}`) != null;
    if (!isInside && showDropdown) {
      showDropdown = false;
    }
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
      <a href="/login" class="block px-16 py-10 text-12 hover:bg-accent">Logout</a>
    </div>
  {/if}
</div>
