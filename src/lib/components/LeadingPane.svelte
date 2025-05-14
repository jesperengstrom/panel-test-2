<script>
  import { getUserSettings } from '$lib/contexts/userSettings';
  import { LEADING_PANE_DEFAULT_WIDTH, LEADING_PANE_MIN_WIDTH, LEADING_PANE_MAX_WIDTH, LEADING_PANE_COLLAPSE_WIDTH } from '$lib/constants/constants';
  import Draggable from './Draggable.svelte';
  import Toolbar from './Toolbar.svelte';
  import PaneContent from './PaneContent.svelte';
  const userSettings = getUserSettings();
  
  let width = $state(userSettings?.leadingPane?.width || LEADING_PANE_DEFAULT_WIDTH);
  let isDragging = $state(false);
  const paneOpen = $derived(userSettings.leadingPane?.open);

  function onDragEnd() {
    userSettings.setLeadingPaneWidth(width);
  }

  function onCollapseWidth() {
    userSettings.toggleLeadingPane();
  }
</script>

<section class={[
    'leading-pane relative hidden md:flex flex-col h-full bg-gray-100 opacity-0',
    !isDragging && 'transition-all',
    paneOpen ? 'translate-x-0 opacity-100' : '-translate-x-full']}
  style="width:{paneOpen ? width : 0}px">
  <!-- <div class="relative overflow-x-hidden h-full"> -->
    <Toolbar>
      {#snippet trailingActions()}
        <button onclick={() => userSettings.toggleLeadingPane()}>⬅️</button>
      {/snippet}
    </Toolbar>
    <div class="pr-1.5 overflow-hidden">
      <div class="leading-pane-content h-full overflow-x-auto p-2">
        <p class="font-bold">leading pane</p>
        <ol class="whitespace-nowrap [&_li]:overflow-hidden [&_li]:overflow-ellipsis">
          <PaneContent />
        </ol>
      </div>
    </div>
  <!-- </div> -->
    <Draggable 
      bind:width
      side="right"
      minWidth={LEADING_PANE_MIN_WIDTH}
      maxWidth={LEADING_PANE_MAX_WIDTH}
      collapseWidth={LEADING_PANE_COLLAPSE_WIDTH}
      bind:isDragging
      disabled={!paneOpen}
      {onDragEnd}
      {onCollapseWidth}
    />
</section>

<style>
  .leading-pane {
    grid-area: leading-pane;
    max-height: calc(100vh - var(--app-bar-height));
  }

  .leading-pane-content {
    scrollbar-width: thin;
  }
</style>

