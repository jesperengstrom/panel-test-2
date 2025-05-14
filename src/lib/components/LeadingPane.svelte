<script>
  import { getUserSettings } from '$lib/contexts/userSettings';
  import { LEADING_PANE_DEFAULT_WIDTH, LEADING_PANE_MIN_WIDTH, LEADING_PANE_MAX_WIDTH, LEADING_PANE_COLLAPSE_WIDTH } from '$lib/constants/constants';
  import Draggable from './Draggable.svelte';
  import Toolbar from './Toolbar.svelte';
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
    'leading-pane relative hidden md:block h-full bg-gray-100 opacity-0',
    !isDragging && 'transition-all',
    paneOpen && 'opacity-100']}
  style="width:{paneOpen ? width : 0}px">
  <!-- <div class="relative overflow-x-hidden h-full"> -->
    <Toolbar />
    <div class={['absolute w-full transition-transform p-2', paneOpen ? 'translate-x-0' : '-translate-x-full']}>
      <p class="font-bold">leading pane</p>
      <ol class="whitespace-nowrap [&_li]:overflow-hidden [&_li]:overflow-ellipsis">
        <li>leading paneleading paneleading paneleading paneleading paneleading pane</li>
        <li>leading paneleading paneleading paneleading paneleading paneleading pane</li>
        <li>leading paneleading paneleading paneleading paneleading paneleading pane</li>
        <li>leading paneleading paneleading paneleading paneleading paneleading pane</li>
        <li>leading paneleading paneleading paneleading paneleading paneleading pane</li>
        <li>leading paneleading paneleading paneleading paneleading paneleading pane</li>
      </ol>
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
  }
</style>

