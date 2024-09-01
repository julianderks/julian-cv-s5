<script>
	import * as Avatar from '$lib/components/ui/avatar';
	import { PUBLIC_SUPABASE_URL } from '$env/static/public';

	let avatarUrl = `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/blob-storage/errorPage/nessie`;
</script>

<div class="flex h-screen flex-col justify-center">
	<div class="flex flex-row items-center space-x-8">
		<div>
			<Avatar.Root class="size-72 border-0 border-white shadow-lg">
				<Avatar.Image src={avatarUrl} alt="@shadcn" class="grayscale" />
			</Avatar.Root>
		</div>
		<div>
			<h1 class="text-7xl font-bold text-gray-100 hover:text-red-600">Oops...</h1>
			<p class="mt-4 text-lg text-gray-300">Sorry, it looks like this page does not exist.</p>
		</div>
	</div>
</div>
