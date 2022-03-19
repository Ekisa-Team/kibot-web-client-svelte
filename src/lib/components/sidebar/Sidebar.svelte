<script lang="ts">
	import type { SidebarItem } from './sidebar';
	import { sidebarItems } from './sidebar';
	import SidebarOption from './SidebarOption.svelte';

	const itemsLists: SidebarItem[][] = sidebarItems;
</script>

<style lang="postcss">
	aside {
		@apply bg-gray-50;
		@apply border-r border-gray-200;
		@apply fixed top-0 left-0;
		@apply pt-16;
		@apply h-full  w-64;
		@apply z-20;
	}

	ul {
		@apply space-y-2;
	}
	ul.with-separator {
		@apply mt-4 pt-4;
		@apply border-t border-gray-200 dark:border-gray-700;
	}
</style>

<aside aria-label="Sidebar">
	<div class="overflow-y-auto rounded py-4 px-3 dark:bg-gray-800">
		{#each itemsLists as list, i}
			<ul class:with-separator={i > 0}>
				{#each list as item}
					<SidebarOption item={item} />
				{/each}
			</ul>
		{/each}
	</div>
</aside>
