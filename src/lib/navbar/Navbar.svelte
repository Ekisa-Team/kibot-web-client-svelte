<script>
	import Logo from '$lib/logo/Logo.svelte';
	import { MenuAlt2, Moon } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<style lang="postcss">
	nav {
		@apply bg-white dark:bg-gray-800;
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
	<div class="content-wrapper">
		<div class="flex items-center">
			<button
				type="button"
				data-toggle-dark="light"
				class="toggle-dark-state-example mr-2 flex items-center rounded-lg border border-gray-200 bg-white p-2 text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
				<Icon src={MenuAlt2} size="20" class="text-gray-500" />
				<span class="hidden">Toggle dark mode</span>
			</button>

			<Logo />
		</div>

		<div class="flex items-center">
			<button
				type="button"
				data-toggle-dark="light"
				class="toggle-dark-state-example mr-2 flex items-center rounded-lg border border-gray-200 bg-white p-2 text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
				<Icon src={Moon} size="20" class="text-gray-500" />

				<span class="hidden">Toggle dark mode</span>
			</button>
		</div>
	</div>
</nav>
