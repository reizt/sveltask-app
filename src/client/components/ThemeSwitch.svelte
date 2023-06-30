<script lang="ts">
  import { prefersDark } from '%u/prefers-dark';
  import { setTheme, type Theme } from './theme';

  let showDropdown: boolean = false;

  const dropDownId = 'header-theme-drop-down';

  const handleClick = (e: MouseEvent) => {
    const isInside = (e.target as Element).closest(`#${dropDownId}`) != null;
    if (!isInside && showDropdown) {
      showDropdown = false;
    }
  };
  const themes: { iconName: string; label: string; value: string }[] = [
    {
      iconName: 'light_mode',
      label: 'Light',
      value: 'light',
    },
    {
      iconName: 'dark_mode',
      label: 'Dark',
      value: 'dark',
    },
    {
      iconName: 'devices',
      label: 'System',
      value: 'system',
    },
  ];
  const switchTheme = (value: string) => {
    let theme = value;
    if (theme === 'system') {
      theme = prefersDark() ? 'dark' : 'light';
    }
    setTheme(theme as Theme);
  };
</script>

<svelte:window on:click={handleClick} />

<div id={dropDownId} class="relative">
  <button on:click={() => (showDropdown = true)} class="flex h-40 w-40 items-center justify-center rounded-6 border-1 border-border hover:bg-accent">
    <span class="material-icons text-18">light_mode</span>
  </button>
  {#if showDropdown}
    <div class="absolute right-0 top-50 mt-10 w-140 overflow-hidden rounded-6 border-1 border-border bg-background">
      {#each themes as theme}
        <button on:click={() => switchTheme(theme.value)} class="flex h-32 w-full items-center gap-x-6 px-10 hover:bg-accent">
          <span class="material-icons text-18">{theme.iconName}</span>
          <span class="text-12">{theme.label}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>
