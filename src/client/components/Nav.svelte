<script lang="ts">
  import { page } from '$app/stores';
  import NavLink from './NavLink.svelte';

  type Link = {
    href: string;
    iconName: string;
    title: string;
  };
  const links: Link[] = [
    {
      href: '/console',
      iconName: 'dashboard',
      title: 'Board',
    },
    {
      href: '/console/settings',
      iconName: 'settings',
      title: 'Settings',
    },
  ];
</script>

<div class="flex w-180 flex-col gap-y-12">
  {#each links as { href, iconName, title }}
    <NavLink {href} {iconName} isCurrent={$page.url.pathname === href} className="w-full">{title}</NavLink>
  {/each}
</div>
