<script lang="ts">
  import type { Snippet } from "svelte";

type ToolbarProps = {
  leadingActions?: Snippet;
  trailingActions?: Snippet;
}

let { leadingActions, trailingActions }: ToolbarProps = $props();
</script>

<nav class="toolbar p-2 bg-white border border-gray-200 border-r-0 h-(--toolbar-height)">
  <!-- <span class="text-xs text-gray-500 float-end">toolbar</span> -->
  <ul class="grid">
    {#if leadingActions}
      <li class="justify-self-start">
        {@render leadingActions()}
      </li>
    {/if}
    {#if trailingActions}
      <li class="justify-self-end">
        {@render trailingActions()}
      </li>
    {/if}
  </ul>
</nav>

<style>
  .toolbar {
    grid-area: toolbar;
  }
</style>