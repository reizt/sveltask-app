<script lang="ts">
  import { onMount } from 'svelte';
  import type { Task } from './task';

  export let task: Task | undefined = undefined;

  let titleField: HTMLInputElement | undefined;

  onMount(() => {
    titleField?.focus();
  });
</script>

<div role="dialog" class="flex flex-col w-400 h-300 p-20 bg-white rounded-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
  <input bind:this={titleField} type="text" value={task?.title ?? ''} placeholder="Untitled" class="text-24" />
  <textarea value={task?.description ?? ''} placeholder="Provide description" class="text-12 font-light w-full grow" />
</div>
