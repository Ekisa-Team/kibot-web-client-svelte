<script lang="ts">
	import Logo from '$components/logo/Logo.svelte';
	import { sidebarState } from '$stores/sidebar';

	const toggleSidebar = () => {
		sidebarState.update((state) => {
			return {
				lastEventType: 'click',
				isOpen: !state.isOpen
			};
		});
	};
</script>

<style lang="postcss">
	nav {
		@apply bg-white;
		@apply border-b border-gray-200;
		@apply fixed top-0 left-0 right-0;
		@apply px-2 py-3 sm:px-4;
		@apply rounded;
		@apply w-full;
		@apply z-30;
	}

	.content-wrapper {
		@apply flex flex-wrap items-center justify-between;
		@apply mx-auto;
	}
</style>

<nav>
	<!-- wrapper -->
	<div class="content-wrapper">
		<!-- left -->
		<div class="flex items-center">
			<button
				type="button"
				data-toggle-dark="light"
				class="toggle-dark-state-example mr-2 flex items-center rounded-lg border border-gray-200 bg-white p-2 text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				on:click={toggleSidebar}>
				<div class="i-heroicons-outline:menu-alt-1 text-xl" />
				<span class="hidden">Toggle dark mode</span>
			</button>

			<Logo />
		</div>

		<!-- right -->
		<div class="flex items-center">
			<button
				type="button"
				data-toggle-dark="light"
				class="toggle-dark-state-example mr-2 flex items-center rounded-lg border border-gray-200 bg-white p-2 text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
				<div class="i-heroicons-outline:moon text-xl" />
				<span class="hidden">Toggle dark mode</span>
			</button>
		</div>
	</div>
</nav>
