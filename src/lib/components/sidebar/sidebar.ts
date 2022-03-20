export type SidebarItem = {
	key: number;
	path: string;
	name: string;
	icon: string;
};

export const sidebarItems: SidebarItem[][] = [
	[
		{
			key: 1,
			path: 'messaging-providers',
			name: 'Messaging providers',
			icon: 'i-ph:plugs-connected-thin'
		},
		{
			key: 2,
			path: 'applications',
			name: 'Applications',
			icon: 'i-ph:terminal-window-thin'
		},
		{
			key: 3,
			path: 'chatbots',
			name: 'Chatbots',
			icon: 'i-ph:robot-thin'
		},
		{
			key: 4,
			path: 'messages',
			name: 'Messages',
			icon: 'i-ph:chat-centered-dots-thin'
		},
		{
			key: 5,
			path: 'templates',
			name: 'Templates',
			icon: 'i-ph:stack-thin'
		},
		{
			key: 6,
			path: 'channels',
			name: 'Channels',
			icon: 'i-ph:line-segments-thin'
		},
		{ key: 7, path: 'webhooks', name: 'Webhooks', icon: 'i-ph:anchor-thin' }
	],
	[
		{
			key: 8,
			path: 'documentation',
			name: 'Documentation',
			icon: 'i-ph:scroll-thin'
		},
		{
			key: 9,
			path: 'help',
			name: 'Help',
			icon: 'i-ph:lifebuoy-thin'
		}
	]
];
