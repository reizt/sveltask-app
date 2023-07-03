<script lang="ts">
  import { getTheme, setTheme, syncThemeToDocument } from '#/store/theme';
  import { onMount } from 'svelte';
  import './styles.css';

  onMount(() => {
    syncThemeToDocument();
  });

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 't') {
      const theme = getTheme();
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />

<div id="root" class={getTheme()}>
  <slot />
</div>
