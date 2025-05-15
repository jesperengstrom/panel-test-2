<script>
  import { page } from "$app/state";
  import TrailingPane from "./TrailingPane.svelte";

  const trailingPanes = $derived(page.url.searchParams.getAll('preview'));
  const MAX_TRAILING_PANES = 3;
</script>

<section class="trailing-panes hidden md:flex">
  {#each trailingPanes as trailingPane, index (index)}
    {#if index < MAX_TRAILING_PANES }
      <TrailingPane id={trailingPane} />
    {/if}
  {/each}
</section>

<style>
  .trailing-panes {
    grid-area: trailing-panes;
    max-height: calc(100vh - var(--app-bar-height));
  }
</style>