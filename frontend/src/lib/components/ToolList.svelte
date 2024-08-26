<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchTools, type Tool } from '$lib/services/toolService';
	import ToggleGroup from './ToggleGroup.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';

	let tools: Tool[] = [];
	let filteredTools: Tool[] = [];
	let uniqueAreas: Set<string> = new Set();
	let selectedTool: Tool | null = null;
	let selectedAreas: string[] = [];
	export let isEditMode: boolean = false;

	$: selectedAreas, filterTools();

	onMount(async () => {
		const { tools: fetchedTools, error } = await fetchTools();
		if (error) {
			console.error('Error fetching tools:', error);
			return;
		}

		tools = fetchedTools;
		tools.sort(
			(a, b) =>
				a.area.localeCompare(b.area) ||
				a.name.localeCompare(b.name) ||
				b.experience_level - a.experience_level
		);
		uniqueAreas = new Set(tools.map((tool) => tool.area));
		filterTools();
	});

	function filterTools() {
		filteredTools = selectedAreas.length
			? tools.filter((tool) => selectedAreas.includes(tool.area))
			: tools;
	}

	function handleToolClick(tool: Tool) {
		selectedTool = tool;
	}

	function handleValueChange(event: CustomEvent<string[]>) {
		selectedAreas = event.detail;
	}
</script>

<div class="flex h-full flex-col">
	<ToggleGroup on:valueChange={handleValueChange}></ToggleGroup>
	<div class="flex-grow overflow-auto rounded-lg border-2 border-white">
		<ScrollArea class="" scrollbarYClasses="w-0" orientation="vertical">
			<div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each filteredTools as tool}
					<Dialog.Root>
						<Dialog.Trigger>
							<button on:click={() => handleToolClick(tool)} aria-label="Tool {tool.name}">
								<Card.Root
									class="relative border-0 text-left shadow-none duration-200 hover:scale-110"
								>
									<Card.Header>
										{#if isEditMode}
											<form method="POST" action="?/delete">
												<input type="hidden" name="name" value={tool.name} />
												<button
													type="submit"
													class="absolute right-0 top-0 z-10"
													on:click={(event) => event.stopPropagation()}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-6 w-6 text-red-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														stroke-width="6"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															d="M6 18L18 6M6 6l12 12"
														/>
													</svg>
												</button>
											</form>
										{/if}
										<Card.Title class="overflow-hidden text-ellipsis whitespace-nowrap">
											{tool.name}
										</Card.Title>
										<Card.Description class="overflow-hidden text-ellipsis whitespace-nowrap">
											{tool.area}
										</Card.Description>
									</Card.Header>
									<Card.Content>
										<div class="flex h-16 w-full flex-col items-center">
											<div class="flex flex-grow items-center justify-center">
												{#if tool.icon}
													<iconify-icon icon={tool.icon} height="3.5em"></iconify-icon>
												{:else if tool.custom_icon_link}
													<img
														src={tool.custom_icon_link}
														alt="{tool.name} icon"
														class="h-14 w-14"
													/>
												{/if}
											</div>
										</div>
									</Card.Content>
									<Card.Footer>
										<div class="flex w-full justify-center gap-1">
											{#each Array(5) as _, i}
												<div
													class="h-2 w-4 rounded-full border-2 border-white {i <
													tool.experience_level
														? 'bg-white'
														: ''}"
												></div>
											{/each}
										</div>
									</Card.Footer>
								</Card.Root>
							</button>
						</Dialog.Trigger>

						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title class="mb-4">
									{selectedTool ? selectedTool.name : 'Tool Details'}
								</Dialog.Title>

								{#if isEditMode}
									<Dialog.Description>
										<h1>Edit Mode Active</h1>
									</Dialog.Description>
								{:else}
									<Dialog.Description>
										<h1 class="font-bold">Introduction</h1>
										<p class="mb-4">{selectedTool ? selectedTool.introduction : ''}</p>
										<h1 class="font-bold">Personal Experience</h1>
										<p class="mb-4">{selectedTool ? selectedTool.personal_experience : ''}</p>
										<p class="mb-4">
											Link to the
											<a
												href={selectedTool ? selectedTool.link_to_docs : '#'}
												class="text-blue-500 underline"
												target="_blank"
											>
												documentation
											</a>
										</p>
									</Dialog.Description>
								{/if}
							</Dialog.Header>
						</Dialog.Content>
					</Dialog.Root>
				{/each}
			</div>
		</ScrollArea>
	</div>
</div>
