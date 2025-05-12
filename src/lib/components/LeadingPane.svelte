<script>
  import Toolbar from "./Toolbar.svelte";
  const { isOpen } = $props();
  let leadingPaneWidth = $derived(isOpen ? 250 : 0);

</script>
<section class="leading-pane relative overflow-x-hidden hidden md:block bg-gray-100 transition-[width]"
  style="width:{leadingPaneWidth}px">
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
</section>

<style>
  .leading-pane {
    grid-area: leading-pane;
  }
</style>

