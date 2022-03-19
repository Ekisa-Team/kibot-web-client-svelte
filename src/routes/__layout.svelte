<script lang="ts">
	import Footer from '$lib/footer/Footer.svelte';
	import Navbar from '$lib/navbar/Navbar.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import 'flowbite/dist/flowbite.css';
	import '../app.css';
</script>

<Navbar />

<Sidebar />

<div class="content-wrapper">
	<main class="p-4 md:p-6 flex-1">
		<slot />
	</main>
	<Footer />
</div>

<style lang="postcss">
	.content-wrapper {
		@apply flex flex-col;
		@apply max-w-screen-2xl mx-auto pl-64;
		@apply pt-16;
		@apply relative;
		@apply w-full h-full;
	}
</style>
