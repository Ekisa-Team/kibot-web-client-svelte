<script lang="ts">
	import type { SidebarItem } from './sidebar';

	export let item: SidebarItem;
	export let showName = true;
</script>

<style lang="postcss">
	a {
		@apply flex items-center;
		@apply rounded-lg;
		@apply p-2;
		@apply whitespace-nowrap text-gray-600;
	}

	a:hover {
		@apply bg-gray-100;
	}

	a:hover > div {
		@apply text-blue-700;
	}
</style>

<li>
	<!-- option -->
	<a href={item.path}>
		<div class="min-w-[25px] text-2xl text-black {item.icon}" />

		{#if showName}
			<span class="ml-3 text-sm">{item.name}</span>
		{/if}
	</a>
</li>
