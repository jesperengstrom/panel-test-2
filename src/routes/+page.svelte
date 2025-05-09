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
  <section class="@container/content content-container grid bg-yellow-50">
    <div class="content grid h-full grid-cols-1 @md:grid-cols-3">
      <Toolbar />
      <main class="main">
        <div class="flex flex-col">
          <a href="/?preview=1">add one right pane</a>
          <a href="/?preview=1&preview=2">add two right panes</a>
          <a href="/?preview=1&preview=2&preview=3">add three right panes</a>
          <a href="/">remove all right panes</a>
          <button class="flex" onclick={() => leadingPaneClosed = !leadingPaneClosed}>Close left pane</button>
        </div>
        main
      </main>
      <aside class="aside bg-amber-100">aside</aside>
    </div>
  </section>
  <section class="trailing-panes hidden md:block bg-blue-50 grid-col">
    <Toolbar />
    trailing panes
  </section>
</div>

<style>
  @import 'tailwindcss';

  .app {
    grid-template-areas:
    'header header header' 
    'content-container content-container content-container';

    grid-template-rows: var(--app-bar-height) auto;

    /* variant */
    @variant md { 
      grid-template-areas:
        'header header header' 
        'leading-pane content-container trailing-panes';
    }
  }

  .header {
    grid-area: header;
  }

  .leading-pane {
    grid-area: leading-pane;
  }

  .content-container {
    grid-area: content-container;
  }

  .content {
    grid-template-columns: 1fr 1fr var(--aside-width);
    grid-template-rows: var(--toolbar-height) 1fr 1fr;
    grid-template-areas: 
      'toolbar toolbar toolbar'
      'main main main'
      'aside aside aside';

    @variant @5xl {
      grid-template-areas: 
      'toolbar toolbar toolbar'
      'main main aside'
      'main main aside';

    }
    
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