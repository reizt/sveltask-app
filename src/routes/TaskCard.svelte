<script lang="ts">
  import type { Task } from './task';
  export let task: Task;
</script>

<button
  on:click
  on:dragstart
  draggable="true"
  class="bg-white outline-none hover:bg-gray-f9 focus:bg-gray-f9 duration-150 rounded-16 shadow-land p-12 w-240 h-120 flex flex-col"
>
  <h3 class="text-20 font-normal">{task.title}</h3>
  <p class="text-10 font-light">{task.description ?? ''}</p>
</button>
