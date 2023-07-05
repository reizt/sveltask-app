<script lang="ts">
  import { createTranslator } from '#/i18n/translator';
  import { i18n } from '#/store/i18n';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import NavLink from './NavLink.svelte';

  const t = derived(i18n, (v) => createTranslator(v.lang));

  type Link = {
    href: string;
    iconName: string;
    title: string;
  };
  $: links = [
    {
      href: '/console',
      iconName: 'dashboard',
      title: $t('pages.board.title'),
    },
    {
      href: '/console/settings',
      iconName: 'settings',
      title: $t('pages.settings.title'),
    },
  ] satisfies Link[];
</script>

<div class="flex w-180 flex-col gap-y-12">
  {#each links as { href, iconName, title }}
    <NavLink {href} {iconName} isCurrent={$page.url.pathname === href} className="w-full">{title}</NavLink>
  {/each}
</div>
