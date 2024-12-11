<script lang="ts">
  import type { TaskListsProps } from "$lib";
  
  let { tasks, deleteTask, editTask }: TaskListsProps = $props();
</script>

<div class="flex flex-col gap-6">
  {#each tasks as task}
    <div class="flex flex-col gap-4 bg-white p-6 rounded-xl">
      <h1 class="font-bold text-2xl">{task.title}</h1>
      <div class="flex flex-row justify-between">
        <div class="flex flex-row gap-3">
          {#each Array.from({ length: 3 }) as _, i}
            <div class="w-6 h-6 rounded-full">
              <i class="fa-solid fa-star {task.priority > i ? "text-yellow-500" : "text-gray-300"}"></i>
            </div>
          {/each}
        </div>
        <div class="flex flex-row items-center gap-3">
          <button aria-label="edit task" onclick={() => editTask(task.id)}>
            <i class="fa-solid fa-edit"></i>
          </button>
          <button aria-label="delete task" onclick={() => deleteTask(task.id)}>
            <i class="fa-solid fa-trash"></i>
          </button>
          <button onclick={() => task.completed = !task.completed}>
            {#if task.completed}
              <i class="fa-solid fa-check-square"></i>
            {:else}
              <i class="fa-regular fa-square"></i>
            {/if}
          </button>
        </div>
      </div>
    </div>
  {/each}
</div>
