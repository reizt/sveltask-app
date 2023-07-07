<script lang="ts">
  import { createTranslator } from '#/client/i18n/translator';
  import { i18n } from '#/client/store/i18n';
  import { derived } from 'svelte/store';

  const t = derived(i18n, (v) => createTranslator(v.lang));
</script>

<button
  on:click
  type="button"
  class="flex h-36 w-120 items-center gap-x-6 rounded-4 bg-primary px-10 text-secondary outline-none outline-2 outline-offset-1 outline-transparent hover:bg-primary/80 focus:outline-outline"
>
  <span class="material-icons text-18">add</span>
  <span class="grow text-center text-12">{$t('pages.board.new_task')}</span>
</button>
