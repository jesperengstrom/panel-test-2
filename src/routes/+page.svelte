<script>
  import AppBar from "$lib/components/AppBar.svelte";
  import Toolbar from "$lib/components/Toolbar.svelte";
  import LeadingPane from "$lib/components/LeadingPane.svelte";
  import TrailingPanes from "$lib/components/TrailingPanes.svelte";

  let leadingPaneOpen = $state(true);
</script>

<div class="app grid min-h-screen max-w-screen overflow-x-hidden">
  <AppBar />
  <LeadingPane isOpen={leadingPaneOpen} />
  <section class="@container/content content-container grid bg-yellow-50">
    <div class="content grid h-full grid-cols-1 @md/content:grid-cols-3">
      <Toolbar />
      <main class="main p-2">
        <div class="flex flex-col">
          <span class="font-bold">
            main
          </span>
          <a href="/?preview=1">add one right pane</a>
          <a href="/?preview=1&preview=2">add two right panes</a>
          <a href="/?preview=1&preview=2&preview=3">add three right panes</a>
          <a href="/">remove all right panes</a>
          <button class="flex" onclick={() => leadingPaneOpen = !leadingPaneOpen}>Close left pane</button>
        </div>
      </main>
      <aside class="aside bg-amber-100 p-2">
        <p class="p-2">aside</p>
      </aside>
    </div>
  </section>
  <TrailingPanes />
</div>

<style>
  @import 'tailwindcss';

  .app {
    grid-template-rows: var(--app-bar-height) auto;
    grid-template-columns: minmax(0px, max-content) auto minmax(0px, max-content);
    grid-template-areas:
    'app-bar app-bar app-bar' 
    'content-container content-container content-container';


    /* variant */
    @variant md { 
      grid-template-areas:
        'app-bar app-bar app-bar' 
        'leading-pane content-container trailing-panes';
    }
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

    @variant @5xl/content {
      grid-template-areas: 
      'toolbar toolbar toolbar'
      'main main aside'
      'main main aside';
    }
  }

  .main {
    grid-area: main;
  }

  .aside {
    grid-area: aside;
  }
</style>