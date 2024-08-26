<script lang="ts">
	import '../app.css';
	import 'iconify-icon';
	import { Toaster } from '$lib/components/ui/sonner';

	const { children } = $props();
</script>

<main class="flex h-screen flex-row justify-center">
	<Toaster />

	{@render children()}
</main>
