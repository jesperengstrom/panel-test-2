<script>
  import { getUserSettings } from '$lib/contexts/userSettings';
  import { DEFAULT_LEFT_PANE_WIDTH, MIN_LEFT_PANE_WIDTH, MAX_LEFT_PANE_WIDTH } from '$lib/constants/constants';
  import Draggable from "./Draggable.svelte";
  import Toolbar from "./Toolbar.svelte";
  const { isOpen } = $props();
  const userSettings = getUserSettings();
  
  let open = $state(isOpen);
  let width = $state(userSettings?.leadingPane?.width || DEFAULT_LEFT_PANE_WIDTH);

  function onDragEnd() {
    if (width <= MIN_LEFT_PANE_WIDTH) {
      console.log('closing!')
      open = false;
      width = 0;
    }
    console.log('dragend', width)
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
    minWidth={MIN_LEFT_PANE_WIDTH}
    maxWidth={MAX_LEFT_PANE_WIDTH}
    {onDragEnd}
  />
</section>

<style>
  .leading-pane {
    grid-area: leading-pane;
  }
</style>

