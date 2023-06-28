<script lang="ts">
  export let disabled: boolean = false;
</script>

<button
  type="submit"
  {disabled}
  class="hover:bg-gray-50 disabled:bg-gray-50 h-40 w-100 rounded-20 bg-black text-14 font-bold text-white outline-2 outline-offset-1 outline-gray-b9 transition-colors focus:outline"
>
  <slot />
</button>
