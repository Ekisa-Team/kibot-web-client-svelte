<script lang="ts">
	import { sidebarState, type SidbarState } from '$stores/sidebar';
	import { sidebarItems, type SidebarItem } from './sidebar';
	import SidebarOption from './SidebarOption.svelte';

	const itemsLists: SidebarItem[][] = sidebarItems;

	let currentState: SidbarState;

	sidebarState.subscribe((state) => {
		currentState = state;
	});

	const handleMouseEnter = () => {
		if (currentState.isOpen) return;

		sidebarState.update(() => ({
			lastEventType: 'hover',
			isOpen: true
		}));
	};

	const handleMouseLeave = () => {
		if (currentState.lastEventType === 'click') return;

		sidebarState.update(() => ({
			lastEventType: 'hover',
			isOpen: false
		}));
	};
</script>

<style lang="postcss">
	aside {
		@apply bg-white;
		@apply border-r border-gray-200;
		@apply fixed top-0 left-0;
		@apply pt-16;
		@apply h-full w-full;
		@apply z-20;
		@apply max-w-[4.1rem];
		transition: max-width 50ms ease-in;
	}

	aside.click-mode {
		transition-delay: 0ms;
	}

	aside.hover-mode {
		transition-delay: 0ms;
	}

	aside.open {
		@apply max-w-[16rem];
		transition: max-width 300ms ease-out;
	}

	ul.with-separator {
		@apply mt-4 pt-4;
		@apply border-t border-gray-200;
	}
</style>

<aside
	class:open={currentState.isOpen}
	class:click-mode={currentState.lastEventType === 'click'}
	class:hover-mode={currentState.lastEventType === 'hover'}
	aria-label="Sidebar"
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}>
	<!-- wrapper -->
	<nav class="overflow-y-auto overflow-x-hidden rounded py-4 px-3">
		<!-- list -->
		{#each itemsLists as list, i}
			<ul class:with-separator={i > 0}>
				<!-- option -->
				{#each list as item}
					<SidebarOption item={item} showName={currentState.isOpen} />
				{/each}
			</ul>
		{/each}
	</nav>
</aside>
