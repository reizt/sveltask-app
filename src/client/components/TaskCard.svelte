<script lang="ts">
  import type { Ent } from '#/def/entity';

  export let task: Ent.Task;
  export let id: string;
  export let isDeleting: boolean = false;
</script>

<button
  {id}
  on:click
  on:dragstart
  on:keydown
  draggable="true"
  class={`flex h-120 w-240 flex-col rounded-6 border-1 border-border bg-background p-10 outline outline-2 outline-offset-2 outline-transparent hover:bg-accent focus:outline-outline ${isDeleting ? 'opacity-50' : ''}`}
>
  <h3 class="text-16 font-medium">{task.title}</h3>
  <p class="text-10 font-light">{task.description ?? ''}</p>
</button>
