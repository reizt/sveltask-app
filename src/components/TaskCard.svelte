<script lang="ts">
  import type { Task } from '../defs/task';
  export let task: Task;
</script>

<button
  on:click
  on:dragstart
  draggable="true"
  class="flex h-120 w-240 flex-col rounded-16 bg-white p-12 shadow-land outline outline-2 outline-offset-2 outline-transparent hover:bg-gray-f9 focus:outline-gray-dd"
>
  <h3 class="text-20 font-normal">{task.title}</h3>
  <p class="text-10 font-light">{task.description ?? ''}</p>
</button>
