import {
	Apps,
	BookRead,
	Chat1,
	ChatForward,
	FlowChart,
	Lifebuoy,
	Robot,
	Server,
	TerminalBox
} from '@steeze-ui/remix-icons';

export type SidebarItem = {
	key: number;
	path: string;
	name: string;
	icon: any;
	iconTheme: 'default' | 'solid';
};

export const sidebarItems: SidebarItem[][] = [
	[
		{
			key: 1,
			path: 'messaging-providers',
			name: 'Messaging providers',
			icon: Server,
			iconTheme: 'default'
		},
		{
			key: 2,
			path: 'applications',
			name: 'Applications',
			icon: Apps,
			iconTheme: 'default'
		},
		{ key: 3, path: 'chatbots', name: 'Chatbots', icon: Robot, iconTheme: 'default' },
		{ key: 4, path: 'messages', name: 'Messages', icon: Chat1, iconTheme: 'default' },
		{ key: 5, path: 'templates', name: 'Templates', icon: ChatForward, iconTheme: 'default' },
		{ key: 6, path: 'channels', name: 'Channels', icon: FlowChart, iconTheme: 'default' },
		{ key: 7, path: 'webhooks', name: 'Webhooks', icon: TerminalBox, iconTheme: 'solid' }
	],
	[
		{
			key: 8,
			path: 'documentation',
			name: 'Documentation',
			icon: BookRead,
			iconTheme: 'default'
		},
		{
			key: 9,
			path: 'help',
			name: 'Help',
			icon: Lifebuoy,
			iconTheme: 'default'
		}
	]
];
