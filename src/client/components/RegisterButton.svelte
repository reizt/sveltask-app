<script>
  export let disabled = false;
  export let loading = false;
</script>

<button
  type="submit"
  {disabled}
  class="relative h-40 w-full rounded-4 bg-primary text-14 text-secondary outline-2 outline-offset-1 outline-border hover:bg-primary/80 focus:outline active:outline disabled:bg-primary/80"
>
  {#if loading}
    <div class="absolute left-16">
      <i class="block h-20 w-20 animate-loading rounded-full border-2 border-secondary border-t-transparent" />
    </div>
  {/if}
  <slot />
</button>
