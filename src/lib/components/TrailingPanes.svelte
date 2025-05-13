<script>
  import { page } from "$app/state";
  import Draggable from "./Draggable.svelte";
  import Toolbar from "./Toolbar.svelte";

  const trailingPaneWidth = $derived.by(() => {
    let numberOfTrailingPanes = page.url.searchParams.getAll('preview').length;
    return 250 * numberOfTrailingPanes;
  })
</script>

<section class="trailing-panes hidden md:block bg-blue-50 grid-col" style="width:{trailingPaneWidth}px">
  <Draggable side="left">
    <Toolbar />
    <div class="p-2">
      <p class="font-bold">trailing panes</p>
    </div>
  </Draggable>
</section>

<style>
  .trailing-panes {
    grid-area: trailing-panes;
  }
</style>