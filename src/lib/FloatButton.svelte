<script lang="ts">
  import type { FloatButtonProps } from "$lib";

  let { hidden, onclick }: FloatButtonProps = $props();
</script>

<button onclick={onclick} class:hidden class="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-800 text-white p-4 rounded-full shadow-lg z-50">
  <i class="fa-solid fa-plus mr-2"></i> New task
</button>