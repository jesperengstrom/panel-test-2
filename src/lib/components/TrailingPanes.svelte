<script>
  import { page } from "$app/state";
  import TrailingPane from "./TrailingPane.svelte";

  const trailingPanes = $derived(page.url.searchParams.getAll('preview'));
  const MAX_TRAILING_PANES = 3

  $inspect(trailingPanes)

  const trailingPaneWidth = $derived.by(() => {
    let numberOfTrailingPanes = page.url.searchParams.getAll('preview').length;
    return 250 * numberOfTrailingPanes;
  })
</script>

<section class="trailing-panes hidden md:flex bg-blue-50">
  {#each trailingPanes as trailingPane, index (index)}
    {#if index < MAX_TRAILING_PANES }
      <TrailingPane id={trailingPane} />
    {/if}
  {/each}
</section>

<style>
  .trailing-panes {
    grid-area: trailing-panes;
  }
</style>