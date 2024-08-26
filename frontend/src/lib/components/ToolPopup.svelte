<script>
	import * as Dialog from '$lib/components/ui/dialog';
	import Button from './ui/button/button.svelte';
	import { enhance } from '$app/forms';

	// Define the fields in an array
	let fields = [
		{ label: 'Tool Name', value: 'Tool Name Text', name: 'name' },
		{ label: 'Area', value: 'Area Text', name: 'area' },
		{ label: 'Experience Level', value: '0-5', name: 'experience_level' },
		{ label: 'Introduction', value: 'Lorem ipsum odor amet...', name: 'introduction' },
		{
			label: 'Personal Experience',
			value: 'Lorem ipsum odor amet...',
			name: 'personal_experience'
		},
		{ label: 'Link to Docs', value: 'Documentation Link', name: 'link_to_docs' },
		{ label: 'Iconify Icon', value: 'Iconify Icon Link Text', name: 'icon' }
	];
</script>

<Dialog.Root>
	<Dialog.Trigger>Open</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="mb-4">Add New Tool</Dialog.Title>
			<Dialog.Description>
				<form method="POST" use:enhance>
					{#each fields as field}
						<div class="mb-4">
							<h1 class="font-bold">{field.label}</h1>
							<input
								class="w-full border-none bg-transparent focus:outline-none"
								name={field.name}
								bind:value={field.value}
							/>
						</div>
					{/each}
					<Button class="mt-4 w-full" type="submit">Add new Tool</Button>
				</form>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
