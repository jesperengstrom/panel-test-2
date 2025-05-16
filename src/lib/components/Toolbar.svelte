<script lang="ts">
  import type { Snippet } from "svelte";

type ToolbarProps = {
  leadingActions?: Snippet;
  trailingActions?: Snippet;
}

let { leadingActions, trailingActions }: ToolbarProps = $props();
</script>

<nav class="toolbar bg-white border border-gray-200 border-r-0">
  <ul class="grid grid-cols-2 grid-rows-1 items-center h-full p-2">
    <li class="justify-self-start">
      {#if leadingActions}
        {@render leadingActions()}
      {:else}
        <p class="text-xs text-gray-500">toolbar</p>
      {/if}
    </li>
    <li class="justify-self-end">
      {#if trailingActions}
        {@render trailingActions()}
      {:else}
        <p class="text-xs text-gray-500">toolbar</p>
      {/if}
    </li>
  </ul>
</nav>

<style>
  .toolbar {
    grid-area: toolbar;
    min-height: var(--toolbar-height);
    height: var(--toolbar-height);
  }
</style>