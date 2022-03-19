<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { SidebarItem } from './sidebar';

	export let item: SidebarItem;
	export let showName = true;

	let optionId: string;
	$: optionId = `option-${item.key}`;
</script>

<style>
	a {
		@apply flex items-center;
		@apply rounded-lg;
		@apply p-2;
		@apply text-base font-normal text-gray-900;
	}
	a:hover {
		@apply bg-gray-200;
	}
</style>

<li>
	<!-- option -->
	<a href={item.path} data-tooltip-target={optionId} data-tooltip-placement="right">
		<Icon src={item.icon} theme={item.iconTheme} size="25" class="text-gray-500" />

		{#if showName}
			<span class="ml-3">{item.name}</span>
		{/if}
	</a>
</li>
