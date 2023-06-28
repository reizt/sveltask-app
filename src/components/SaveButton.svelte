<script lang="ts">
  export let disabled: boolean = false;
</script>

<button
  type="submit"
  {disabled}
  class="h-40 w-100 rounded-4 bg-primary text-14 font-bold text-secondary outline-2 outline-offset-1 outline-border transition-colors hover:bg-primary/80 focus:outline disabled:bg-primary/80"
>
  <slot />
</button>
