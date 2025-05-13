<script>
  import { getUserSettings } from '$lib/contexts/userSettings';
  import { DEFAULT_LEADING_PANE_WIDTH, MIN_LEADING_PANE_WIDTH, MAX_LEADING_PANE_WIDTH } from '$lib/constants/constants';
  import Draggable from './Draggable.svelte';
  import Toolbar from './Toolbar.svelte';
  const { isOpen } = $props();
  const userSettings = getUserSettings();
  
  let open = $state(isOpen);
  let width = $state(userSettings?.leadingPane?.width || DEFAULT_LEADING_PANE_WIDTH);

  function onDragEnd() {
    userSettings.setLeadingPaneWidth(Math.round(width));

    if (width <= MIN_LEADING_PANE_WIDTH) {
      console.log('should close!')
      // open = false;
      // width = 0;
    }
  }
</script>

<section class="leading-pane relative hidden md:block h-full bg-gray-100"
  style="width:{width}px">
  <!-- <div class="relative overflow-x-hidden h-full"> -->
    <Toolbar />
    <div class={['absolute w-full transition-transform p-2', open ? 'translate-x-0' : '-translate-x-full']}>
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
    minWidth={MIN_LEADING_PANE_WIDTH}
    maxWidth={MAX_LEADING_PANE_WIDTH}
    {onDragEnd}
  />
</section>

<style>
  .leading-pane {
    grid-area: leading-pane;
  }
</style>

