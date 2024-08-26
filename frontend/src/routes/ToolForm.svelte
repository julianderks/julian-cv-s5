<script lang="ts">
	import Ranking from '$lib/components/Ranking.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { toolSchema, type ToolSchema } from './schema';
	import { type SuperValidated, type Infer, superForm, type FormPath } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<ToolSchema>>;
	const form = superForm(data, {
		validators: zodClient(toolSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success('You submitted the form', {
					action: {
						label: 'Undo',
						onClick: () => {
							toast('Undo action executed');
						}
					}
				});
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const { form: formData, enhance } = form;

	let fields: { label: string; name: FormPath<Infer<ToolSchema>>; placeholder?: string }[] = [
		{ label: 'Tool Name', name: 'name', placeholder: 'Enter the tool name' },
		{ label: 'Area', name: 'area', placeholder: 'Enter the area of expertise' },
		{ label: 'Experience Level', name: 'experience_level' },
		{ label: 'Introduction', name: 'introduction', placeholder: 'Write a brief introduction' },
		{
			label: 'Personal Experience',
			name: 'personal_experience',
			placeholder: 'Describe your personal experience with the tool'
		},
		{ label: 'Link to Docs', name: 'link_to_docs', placeholder: 'https://example.com/docs' },
		{ label: 'Iconify Icon', name: 'icon', placeholder: 'https://example.com/icon.png' }
	];
</script>

<Dialog.Content>
	<Dialog.Header>
		<Dialog.Title class="mb-4">Add New Tool</Dialog.Title>
		<Dialog.Description>
			<form method="POST" use:enhance action="?/add">
				{#each fields as field}
					<div class="mb-4">
						<Form.Field {form} name={field.name}>
							<Form.Control let:attrs>
								<Form.Label class="font-bold">{field.label}</Form.Label>

								{#if field.name === 'experience_level'}
									<div class="pb-2 pt-4">
										<Ranking bind:value={$formData[field.name]} max={5} />
									</div>
								{:else}
									<Input
										{...attrs}
										bind:value={$formData[field.name]}
										class="w-full border-none bg-transparent focus:outline-none"
										placeholder={field.placeholder}
									/>
								{/if}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
				{/each}

				<Form.Button class="mt-4 w-full">Add new Tool</Form.Button>
			</form>
		</Dialog.Description>
	</Dialog.Header>
</Dialog.Content>
