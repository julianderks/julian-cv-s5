<script lang="ts">
	export let value: number = 0;
	export let max: number = 5;

	let hoverValue: number | null = null;

	const setValue = (newValue: number) => {
		value = newValue;
		hoverValue = null; // Reset hover state after click
	};

	const handleMouseEnter = (newHoverValue: number) => {
		hoverValue = newHoverValue;
	};

	const handleMouseLeave = () => {
		hoverValue = null;
	};
</script>

<div class="flex w-full gap-1">
	{#each Array(max) as _, i}
		<input type="hidden" name="experience_level" bind:value />
		<button
			type="button"
			class="h-4 w-8 cursor-pointer rounded-md border-2 border-white {i <
			(hoverValue !== null ? hoverValue : value)
				? 'bg-white'
				: ''}"
			on:click={() => setValue(i + 1)}
			on:mouseenter={() => handleMouseEnter(i + 1)}
			on:mouseleave={handleMouseLeave}
			aria-label="Set experience level to {i + 1}"
		></button>
	{/each}
</div>
