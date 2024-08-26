<script lang="ts">
	import ToolList from '$lib/components/ToolList.svelte';
	import Introduction from '$lib/components/Introduction.svelte';
	import type { PageData } from './$types.js';
	import ToolForm from './ToolForm.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';

	let isEditMode = false;

	function toggleEditMode() {
		isEditMode = !isEditMode;
	}

	export let data: PageData;
</script>

<div class="relative flex h-full justify-center">
	<div class="grid h-full max-w-7xl grid-cols-1 lg:grid-cols-2">
		<div class="mx-8 pt-8 lg:py-8">
			<Introduction />
		</div>
		<div class="mx-8 flex h-[calc(100vh-2rem)] min-h-[600px] flex-col pb-8 lg:py-8">
			<ToolList {isEditMode} />

			<div class="mt-2 flex basis-1/12 flex-row justify-center gap-x-8">
				<!-- Apply the red color when isEditMode is true -->
				<Button
					on:click={toggleEditMode}
					variant="ghost"
					class="w-1/2 {isEditMode ? 'bg-red-500 ' : ''}"
				>
					Edit Mode
				</Button>
				<Dialog.Root>
					<Dialog.Trigger class="w-1/2 {buttonVariants({ variant: 'ghost' })}">
						Add new Tool
						<ToolForm data={data.form} />
					</Dialog.Trigger>
				</Dialog.Root>
			</div>
		</div>
	</div>
</div>
