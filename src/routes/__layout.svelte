<script lang="ts">
	import Footer from '@components/footer/Footer.svelte';
	import Navbar from '@components/navbar/Navbar.svelte';
	import Sidebar from '@components/sidebar/Sidebar.svelte';
	import '@theme/styles.css';
	import 'flowbite/dist/flowbite.css';
</script>

<style lang="postcss">
	.content-wrapper {
		@apply flex flex-col;
		@apply mx-auto max-w-screen-2xl pl-64;
		@apply pt-16;
		@apply relative;
		@apply h-full w-full;
	}
</style>

<Navbar />

<Sidebar />

<div class="content-wrapper">
	<main class="flex-1 p-4 md:p-6">
		<slot />
	</main>
	<Footer />
</div>
