<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let href: string;
  export let isCurrent: boolean;
  export let className: string | undefined;
  export let iconName: string;
</script>

<a
  {href}
  class={twMerge(
    'flex h-40 items-center gap-x-10 rounded-6 p-10 outline-2 outline-offset-1',
    isCurrent ? 'pointer-events-none bg-accent outline-transparent' : 'outline-transparent hover:bg-accent focus:outline-accent',
    className,
  )}
  tabindex={isCurrent ? -1 : undefined}
>
  <span class="material-icons text-20">{iconName}</span>
  <span class="text-12">
    <slot />
  </span>
</a>
