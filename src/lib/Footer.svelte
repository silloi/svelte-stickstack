<script lang="ts">
	export let color = "";
	export let updateColor = (color: string) => {};
	export let next = () => {};
	export let first = () => {};

	let colorPicker: HTMLInputElement;

	const openColorPicker = () => {
		colorPicker.focus();
		colorPicker.value = color;
    colorPicker.click();
	};

	const handleChangeColor = (e: any) => {
		updateColor(e.target.value);
	};
</script>

<footer class="flex justify-between">
	<input type="color" bind:value={color} bind:this={colorPicker} on:input={handleChangeColor} hidden />
	<button class="btn btn-circle btn-outline picker" style="--color:{color}" on:click={openColorPicker}></button>
	<div>
		<button on:click={first} class="btn btn-circle btn-outline">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 16 16" stroke="currentColor">
        <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
        <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
			</svg>
		</button>
		<button on:click={next} class="btn btn-circle btn-outline">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 16 16" stroke="currentColor"><path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/></svg>
		</button>
	</div>
</footer>

<style>
	.picker {
		background-color: var(--color);
	}
</style>
