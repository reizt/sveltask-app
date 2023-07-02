<script lang="ts">
  export let type: 'submit' | 'button' = 'submit';
  export let disabled: boolean = false;
  export let style: 'reverse' | 'outline' = 'reverse';
</script>

<button
  {type}
  {disabled}
  on:click
  class="h-40 w-100 rounded-4 text-14 font-bold outline-2 outline-offset-1 outline-outline transition-colors focus:outline {{
    reverse: 'bg-primary text-secondary hover:bg-primary/80 disabled:bg-primary/80',
    outline: 'border-1 border-primary bg-transparent text-primary hover:bg-accent disabled:bg-accent',
  }[style]}"
>
  <slot />
</button>
