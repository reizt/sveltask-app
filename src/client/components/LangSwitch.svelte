<script lang="ts">
  import type { Lang } from '#/client/i18n/types';
  import { i18n } from '#/client/store/i18n';

  let showDropdown: boolean = false;

  const dropDownId = 'header-lang-drop-down';

  const handleClick = (e: MouseEvent) => {
    const isInside = (e.target as Element).closest(`#${dropDownId}`) != null;
    if (!isInside && showDropdown) {
      showDropdown = false;
    }
  };
  const languages: { label: string; value: string }[] = [
    { label: 'English', value: 'en' },
    { label: '日本語', value: 'ja' },
  ];
  const switchLang = (lang: string) => {
    i18n.update(() => ({ lang: lang as Lang }));
  };
</script>

<svelte:window on:click={handleClick} />

<div id={dropDownId} class="relative">
  <button on:click={() => (showDropdown = true)} class="flex h-40 w-40 items-center justify-center rounded-6 border-1 border-border hover:bg-accent">
    <span class="material-icons text-18">language</span>
  </button>
  {#if showDropdown}
    <div class="absolute right-0 top-50 mt-10 w-140 overflow-hidden rounded-6 border-1 border-border bg-background">
      {#each languages as theme}
        <button on:click={() => { switchLang(theme.value); }} class="flex h-32 w-full items-center gap-x-6 px-10 hover:bg-accent">
          <span class="text-12">{theme.label}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>
