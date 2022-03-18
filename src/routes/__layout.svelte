<script lang="ts">
	import Footer from '$lib/footer/Footer.svelte';
	import Navbar from '$lib/navbar/Navbar.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import 'flowbite/dist/flowbite.css';
	import '../app.css';
</script>

<Navbar />

<Sidebar />

<div class="relative pt-16 w-full max-w-screen-2xl mx-auto pl-64">
	<main class="p-4 md:p-6">
		<slot />
	</main>
	<Footer />
</div>
