<script lang="ts">
  import { getTheme, setTheme } from '#/components/theme';
  import { onMount } from 'svelte';
  import './styles.css';

  onMount(() => {
    const theme = getTheme();
    setTheme(theme);
  });

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 't') {
      const theme = getTheme();
      if (theme === 'light') {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />

<slot />
