<script lang="ts">
  import { browser } from "$app/environment";
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	// const COLORS = ["#ABDEE6", "#CBAACB", "#FFFFB5", "#FFCCB6", "#F3B0C3"];
	const COLORS = ["#00A5E3", "#8DD7BF", "#FF96C5", "#FF5768", "#FFBF65"];
	
	const pickColor = (index: number) => COLORS[index % COLORS.length];

	const initializeTodoList = () => {
		const todoListString = browser ? localStorage.getItem("todos") : "";
		if (todoListString) {
			return JSON.parse(todoListString);
		}
		const initialTodo = [{ content: "", color: pickColor(0) }];
		return initialTodo;
	};

	let todoList = initializeTodoList();
	let currentIndex = 0;

	let textareaElement: HTMLTextAreaElement;

  const updateLocalStorage = (todoList: any) => {
    browser && localStorage.setItem("todos", JSON.stringify(todoList));
  };

  const updateContent = (value: string, index: number) => {
    const newTodo = { ...todoList[index], content: value };
    todoList[index] = newTodo;
    updateLocalStorage(todoList);
  };

	const createTodo = () => {
		const newTodo = {
			content: "",
			color: pickColor(todoList.length),
		};
		todoList = [newTodo, ...todoList];
    updateLocalStorage(todoList);
		textareaElement.focus();
	};

	const archiveTodo = () => {
		if (todoList.length <= 1) {
			return;
		}
		const isLatest = currentIndex === 0;
		todoList = todoList.filter((_: any, index: number) => index !== currentIndex);
		updateLocalStorage(todoList);
		if (!isLatest) {
			currentIndex--;
		}
	};

	const updateColor = (newColor: string) => {
		todoList[currentIndex].color = newColor;
		updateLocalStorage(todoList);
	};

	const goNextTodo = () => {
		currentIndex = (currentIndex + 1) % todoList.length;
	};

	const goFirstTodo = () => {
		currentIndex = 0;
	};
</script>

<main class="flex flex-col h-screen w-full p-4">
	<Header create={createTodo} archive={archiveTodo} current={currentIndex + 1} length={todoList.length}  />
	{#each todoList as todo, todoIndex}
		{#if todoIndex === currentIndex}
			<article class="flex-1 px-12"> 
				<textarea bind:value={todo.content} bind:this={textareaElement} on:input={(e) => updateContent(e.currentTarget.value, todoIndex)} style="--color: {todo.color}" placeholder="Todo..." class="textarea h-full w-full text-8xl text-black"></textarea>
			</article>
		{/if}
	{/each}
	<Footer color={todoList[currentIndex].color} updateColor={updateColor} next={goNextTodo} first={goFirstTodo} />
</main>

<style>
	textarea {
		background-color: var(--color);
	}
</style>
