<script lang="ts">
  import { page } from "$app/state";
  import { TRAILING_PANE_DEFAULT_WIDTH, TRAILING_PANE_MAX_WIDTH, TRAILING_PANE_MIN_WIDTH } from "$lib/constants/constants";
  import { getUserSettings } from "$lib/contexts/userSettings";
  import Draggable from "./Draggable.svelte";
  import Toolbar from "./Toolbar.svelte";
  import TrailingPaneContent from "./TrailingPaneContent.svelte";

  const { id } = $props();
  const userSettings = getUserSettings();
  // let width = $state(userSettings?.leadingPane?.width || TRAILING_PANE_DEFAULT_WIDTH);
  let width = $state(TRAILING_PANE_DEFAULT_WIDTH);
  const removeLink = $derived.by(() => {
    const params = new URLSearchParams(page.url.searchParams);
    const previews = params.getAll('preview');
    const updatedPreviews = previews.filter(value => value !== id);
    params.delete('preview');
    updatedPreviews.forEach(preview => params.append('preview', preview));
    return '/?' + params.toString();
  });
</script>

<div class="trailing-pane relative flex flex-col bg-gray-100" style="width:{width}px">
  <Toolbar>
    {#snippet trailingActions()}
    <a href={removeLink} class="block ml-auto">
      <div class="size-4">❌</div>
    </a>
    {/snippet}
  </Toolbar>
  <div class="pr-1.5 overflow-hidden">
    <div class="trailing-pane-content h-full overflow-x-auto">
      <TrailingPaneContent {id} />
    </div>
  </div>
  <Draggable 
    bind:width
    side="left"
    minWidth={TRAILING_PANE_MIN_WIDTH}
    maxWidth={TRAILING_PANE_MAX_WIDTH}
  />
</div>

<style>
  .trailing-pane-content {
    scrollbar-width: thin;
  }
</style>