<script lang="ts">
  import type { TaskModalProps } from "$lib";

  let { hidden, task = $bindable(), toggleModal, onclick }: TaskModalProps = $props();
</script>

<div class:hidden class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div class="bg-white opacity-100 w-full max-w-xl min-h-96 p-4 rounded-xl flex flex-col gap-4">
    <h1 class="font-bold text-xl text-purple-700">Criar/Editar tarefa</h1>
    <div class="flex flex-col gap-3">
      <label for="title">Título</label>
      <input type="text" id="title" bind:value={task.title} class="border border-gray-300 rounded-lg p-2" />
      <label for="description">Descrição</label>
      <textarea id="description" bind:value={task.description} class="border border-gray-300 rounded-lg p-2"></textarea>
      <label for="priority">Prioridade</label>
      <select id="priority" bind:value={task.priority} class="border border-gray-300 rounded-lg p-2">
        {#each Array.from({ length: 3 }) as _, i}
          <option value={i+1}>{i+1}</option>
        {/each}
      </select>
      <div class="flex flex-row justify-between">
        <button onclick={toggleModal} class="bg-red-500 text-white px-4 py-2 rounded-lg">Cancelar</button>
        <button onclick={onclick} class="bg-green-500 text-white px-4 py-2 rounded-lg">Salvar</button>
      </div>
    </div>
  </div>
</div>