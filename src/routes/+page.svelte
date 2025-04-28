<script>
  import { page } from "$app/state";
  import Toolbar from "$lib/components/Toolbar.svelte";

  let leadingPaneClosed = $state(false);
  let leadingPaneWidth = $derived(leadingPaneClosed ? 0 : 250);

  const trailingPaneWidth = $derived.by(() => {
    let numberOfTrailingPanes = page.url.searchParams.getAll('preview').length;
    return 250 * numberOfTrailingPanes;
  })
</script>

<div class="app grid min-h-screen max-w-screen overflow-x-hidden transition-all"
  style={`grid-template-columns: ${leadingPaneWidth}px auto ${trailingPaneWidth}px`}>
  <header class="header bg-green-100">appBar</header>
  <section class="leading-pane relative overflow-x-hidden overflow-y-scroll hidden md:block bg-gray-100">
    <Toolbar />
    <div class={['absolute w-full transition-all', leadingPaneClosed ? '-translate-x-full' : 'translate-x-0']}>
      <p>leading pane</p>
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
  <section class="content grid bg-yellow-50">
    <Toolbar />
    <main class="main">
      <div class="flex flex-col">
        <a href="/?preview=1">add one right pane</a>
        <a href="/?preview=1&preview=2">add two right panes</a>
        <a href="/?preview=1&preview=2&preview=3">add three right panes</a>
        <a href="/">remove all right panes</a>
        <button onclick={() => leadingPaneClosed = !leadingPaneClosed}>Close left pane</button>
      </div>
      main
    </main>
    <aside class="aside bg-amber-100">aside</aside>
  </section>
  <section class="trailing-panes hidden md:block bg-blue-50">
    <Toolbar />
    trailing panes
  </section>
</div>

<style>
  @import 'tailwindcss';

  .app {
    grid-template-areas:
    'header header header' 
    'content content content';

    grid-template-rows: var(--app-bar-height) auto;

    /* variant */
    @variant md { 
      grid-template-areas:
        'header header header' 
        'leading-pane content trailing-panes';
    }
  }

  .header {
    grid-area: header;
  }

  .leading-pane {
    grid-area: leading-pane;
  }

  .content {
    grid-area: content;

    grid-template: 
    'toolbar toolbar' var(--toolbar-height)
    'main aside' auto / auto 250px
  }

  .trailing-panes {
    grid-area: trailing-panes;
  }

  .main {
    grid-area: main;
  }

  .aside {
    grid-area: aside;
  }
</style>