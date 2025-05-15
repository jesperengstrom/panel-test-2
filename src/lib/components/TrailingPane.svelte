<script lang="ts">
  import { page } from "$app/state";
  import { TRAILING_PANE_DEFAULT_WIDTH, TRAILING_PANE_MAX_WIDTH, TRAILING_PANE_MIN_WIDTH } from "$lib/constants/constants";
  import { getUserSettings } from "$lib/contexts/userSettings";
  import Draggable from "./Draggable.svelte";

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

<div class="trailing-pane bg-gray-100 relative flex flex-col border-t border-t-gray-200" style="width:{width}px">
  <div class="h-[var(--toolbar-height)] w-full flex p-2">
    <a href={removeLink} class="block ml-auto">
      <div class="size-4">❌</div>
    </a>
  </div>
  <div class="p-2 text-center">
    <p>Hi! {id}</p>
  </div>
  <Draggable 
    bind:width
    side="left"
    minWidth={TRAILING_PANE_MIN_WIDTH}
    maxWidth={TRAILING_PANE_MAX_WIDTH}
/>
</div>