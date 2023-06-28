<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let href: string;
  export let isCurrent: boolean;
  export let className: string | undefined = undefined;
  export let iconName: string;
</script>

<a
  {href}
  class={twMerge(
    'flex h-40 items-center gap-x-10 rounded-10 p-10 outline-2 outline-offset-1',
    isCurrent ? 'pointer-events-none bg-gray-f0 outline-transparent' : 'outline-transparent hover:bg-gray-f0 focus:outline-gray-f0',
    className,
  )}
  tabindex={isCurrent ? -1 : undefined}
>
  <span class="material-icons">{iconName}</span>
  <span class="text-14">
    <slot />
  </span>
</a>
