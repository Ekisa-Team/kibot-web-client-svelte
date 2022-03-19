<script lang="ts">
	import { sidebarItems } from './sidebar';
	import SidebarOption from './SidebarOption.svelte';

	const items = sidebarItems;
</script>

<aside
	class="w-64 bg-gray-50 border-r border-gray-200 fixed top-0 left-0 z-20 pt-16 h-full"
	aria-label="Sidebar"
>
	<div class="overflow-y-auto py-4 px-3  rounded dark:bg-gray-800">
		<ul class="space-y-2">
			{#each items as item}
				<!-- content here -->
				<SidebarOption {item} />
			{/each}
		</ul>
	</div>
</aside>
