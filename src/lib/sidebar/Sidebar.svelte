<script lang="ts">
	import {
		Apps,
		Chat1,
		ChatForward,
		FlowChart,
		Robot,
		Server,
		TerminalBox
	} from '@steeze-ui/remix-icons';
	import { Icon } from '@steeze-ui/svelte-icon';

	type MenuItem = {
		path: string;
		name: string;
		icon: any;
		iconTheme: 'default' | 'solid';
	};

	const menuItems: Array<MenuItem> = [
		{
			path: 'messaging-providers',
			name: 'Messaging providers',
			icon: Server,
			iconTheme: 'default'
		},
		{
			path: 'applications',
			name: 'Applications',
			icon: Apps,
			iconTheme: 'default'
		},
		{ path: 'chatbots', name: 'Chatbots', icon: Robot, iconTheme: 'default' },
		{ path: 'messages', name: 'Messages', icon: Chat1, iconTheme: 'default' },
		{ path: 'templates', name: 'Templates', icon: ChatForward, iconTheme: 'default' },
		{ path: 'channels', name: 'Channels', icon: FlowChart, iconTheme: 'default' },
		{ path: 'webhooks', name: 'Webhooks', icon: TerminalBox, iconTheme: 'solid' }
	];
</script>

<aside
	class="w-64 bg-gray-50 border-r border-gray-200 fixed top-0 left-0 z-20 pt-16 h-full"
	aria-label="Sidebar"
>
	<div class="overflow-y-auto py-4 px-3  rounded dark:bg-gray-800">
		<ul class="space-y-2">
			{#each menuItems as item}
				<!-- content here -->
				<li>
					<a
						href={item.path}
						class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
					>
						<Icon src={item.icon} theme={item.iconTheme} size="25" class="text-gray-500" />
						<span class="ml-3">{item.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</aside>
