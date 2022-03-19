<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { SidebarItem } from './sidebar';

	export let item: SidebarItem;
</script>

<li>
	<a
		href={item.path}
		class="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
		<Icon src={item.icon} theme={item.iconTheme} size="25" class="text-gray-500" />
		<span class="ml-3">{item.name}</span>
	</a>
</li>
