<script lang="ts">
	import Footer from '$lib/footer/Footer.svelte';
	import Navbar from '$lib/navbar/Navbar.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import 'flowbite/dist/flowbite.css';
	import '../app.css';
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
