<script>
  import Sidebar from './Sidebar.svelte';
  import './styles.css';
</script>

<div class="flex min-h-screen">
  <Sidebar />
  <main class="py-40 px-32">
    <slot />
  </main>
</div>
