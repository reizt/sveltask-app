<script>
  export let disabled = false;
</script>

<button
  type="submit"
  {disabled}
  class="h-40 w-full rounded-4 bg-primary text-14 text-secondary outline-2 outline-offset-1 outline-border hover:bg-primary/80 focus:outline active:outline disabled:bg-primary/80"
>
  <slot />
</button>
