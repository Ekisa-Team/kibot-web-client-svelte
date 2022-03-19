<script>
	import Logo from '$lib/logo/Logo.svelte';

	const currentYear = new Date().getFullYear();
</script>

<footer class="flex-shrink-0 rounded-lg bg-white p-4 shadow dark:bg-gray-800 md:px-6 md:py-8">
	<div class="flex items-center justify-between">
		<Logo />

		<ul class="mb-6 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
			<li>
				<a href="documentation" class="mr-4 hover:underline md:mr-6 ">Documentation</a>
			</li>
			<li>
				<a href="help" class="mr-4 hover:underline md:mr-6">Help</a>
			</li>
		</ul>
	</div>
	<hr class="mx-auto my-6 border-gray-200 dark:border-gray-700" />
	<span class="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
		© {currentYear}
		<a href="https://github.com/Ekisa-Team/chatbots-web-client" class="hover:underline">
			EkisaChatbots
		</a>. All rights reserved.
	</span>
</footer>
