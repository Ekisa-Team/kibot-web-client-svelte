<script>
	import Logo from '$components/logo/Logo.svelte';

	const currentYear = new Date().getFullYear();
</script>

<style lang="postcss">
	footer {
		@apply flex-shrink-0;
		@apply md:px-6 md:py-8;
	}

	.content-wrapper {
		@apply bg-white;
		@apply flex items-center justify-between;
		@apply p-4;
		@apply rounded-lg;
		@apply shadow;
	}

	ul {
		@apply flex flex-wrap items-center;
		@apply text-sm text-gray-500;
	}

	ul > li > a {
		@apply mr-4 md:mr-6;
	}

	ul > li > a:hover {
		@apply underline;
	}

	.copyright-text {
		@apply block;
		@apply pt-8;
		@apply text-sm text-gray-500;
		@apply text-center;
	}
</style>

<footer>
	<!-- wrapper -->
	<div class="content-wrapper">
		<Logo />

		<ul>
			<li>
				<a href="documentation">Documentation</a>
			</li>
			<li>
				<a href="help">Help</a>
			</li>
		</ul>
	</div>

	<!-- copyright -->
	<span class="copyright-text">
		© {currentYear}

		<a href="https://github.com/Ekisa-Team/chatbots-web-client" class="hover:underline">
			EkisaChatbots
		</a>

		. All rights reserved.
	</span>
</footer>
