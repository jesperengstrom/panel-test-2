<script>
  import Draggable from "./Draggable.svelte";
  import Toolbar from "./Toolbar.svelte";
  const { isOpen } = $props();
  let leadingPaneWidth = $derived(isOpen ? 250 : 0);
</script>

<section class="leading-pane hidden md:block h-full bg-gray-100">
  <Draggable side="right">
    <div class="relative overflow-x-hidden h-full">
      <Toolbar />
      <div class={['absolute w-full transition-transform p-2', isOpen ? 'translate-x-0' : '-translate-x-full']}>
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
    </div>
  </Draggable>
</section>

<style>
  .leading-pane {
    grid-area: leading-pane;
  }
</style>

