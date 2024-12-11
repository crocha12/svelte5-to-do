<script lang="ts">
  import type { Task } from "$lib";
  import FloatButton from "$lib/FloatButton.svelte";
  import TaskModal from "$lib/TaskModal.svelte";
  import TasksList from "$lib/TasksList.svelte";
  import { onMount } from "svelte";

  let task: Task = $state({ id: 0, title: '', description: '', priority: 0, completed: false });
  let tasksList: Task[] = $state([]);
  let toDoTasks = $derived(tasksList.filter(task => task.completed === false))
  let doneTasks = $derived(tasksList.filter(task => task.completed === true))

  onMount(() => {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
      tasksList = JSON.parse(tasks);
    }
  });
  
  $effect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasksList));
  });

  let isModalOpen: boolean = $state(false);
  function toggleModal() : void {
    isModalOpen = !isModalOpen;
  }

  function deleteTask(id: number) : void {
    tasksList = tasksList.filter(task => task.id !== id);
  }

  function createOrUpdateTask() : void {
    if (tasksList.find(t => t.id === task.id)) {
      tasksList = tasksList.map(t => t.id === task.id ? task : t);
    }
    else {
      tasksList.push(task);
    }
    toggleModal();
  }

  function newTask() : void {
    let id = 0;
    try {
      id = tasksList[tasksList.length - 1].id + 1;
    }
    catch (e) {
      id = 0;
    }
    task = { id , title: '', description: '', priority: 1, completed: false };
    toggleModal();
  }

  function editTask(task_id: number) : void {
    task = tasksList.find(task => task.id === task_id) as Task;
    toggleModal();
  }
</script>

<main class="w-full h-screen flex justify-center relative overflow-x-auto snap-x snap-mandatory lg:overflow-visible lg:snap-none">
  <TaskModal hidden={!isModalOpen} bind:task toggleModal={() => toggleModal()} onclick={() => createOrUpdateTask()} />
  <FloatButton hidden={isModalOpen} onclick={() => newTask()} />

  <div class="w-full flex flex-row lg:items-center lg:justify-center lg:gap-10 lg:py-10 snap-x snap-mandatory">
    <div class="w-full flex-shrink-0 h-screen lg:h-full bg-purple-300 lg:rounded-2xl flex flex-col gap-6 p-6 snap-start lg:max-w-lg">
      <div class="flex flex-row items-center gap-4">
        <i class="fa-solid fa-list fa-xl"></i>
        <h1 class="font-bold text-3xl">To-Do</h1>
      </div>
      <TasksList deleteTask={deleteTask} tasks={toDoTasks} editTask={editTask} />
    </div>
    <div class="w-full flex-shrink-0 h-screen lg:h-full bg-purple-400 lg:rounded-2xl flex flex-col gap-6 p-6 snap-start lg:max-w-lg">
      <div class="flex flex-row items-center gap-4">
        <i class="fa-solid fa-check fa-xl"></i>
        <h1 class="font-bold text-3xl">Done</h1>
      </div>
      <TasksList deleteTask={deleteTask} tasks={doneTasks} editTask={editTask} />
    </div>
  </div>
</main>

