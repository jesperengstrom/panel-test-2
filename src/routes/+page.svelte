<script>
  import AppBar from "$lib/components/AppBar.svelte";
  import Toolbar from "$lib/components/Toolbar.svelte";
  import LeadingPane from "$lib/components/LeadingPane.svelte";
  import TrailingPanes from "$lib/components/TrailingPanes.svelte";
  import { getUserSettings } from "$lib/contexts/userSettings";
  import { fade } from "svelte/transition";
  import SearchResultCard from "$lib/components/SearchResultCard.svelte";

  const userSettings = getUserSettings();
  const searchResults = [
    { id: 43434 },
    { id: 34534 },
    { id: 15777 },
    { id: 67867 },
    { id: 23537 },
  ]

</script>

<div class="app grid min-h-screen max-w-screen overflow-x-hidden">
  <AppBar />
  <LeadingPane />
  <section class="@container/content content-container grid bg-white">
    <div class="content grid h-full grid-cols-1 @md/content:grid-cols-3">
      <Toolbar>
        {#snippet leadingActions()}
          {#if !userSettings.leadingPane?.open}
            <button class="hidden md:block" in:fade={{ duration: 200 }} onclick={() => userSettings.toggleLeadingPane()}>➡️</button>
          {/if}
        {/snippet}
      </Toolbar>
      <main class="main p-2">
        <div class="flex flex-col gap-2 items-start">
          <span class="text-xs text-gray-500">
            main
          </span>
          {#each searchResults as searchResult}
          <SearchResultCard id={searchResult.id} />
          {/each}
        </div>
      </main>
      <aside class="aside bg-amber-100 p-2">
        <p class="text-xs text-gray-500">aside</p>
      </aside>
    </div>
  </section>
  <TrailingPanes />
</div>

<style>
  @import 'tailwindcss';

  .app {
    grid-template-rows: var(--app-bar-height) auto;
    grid-template-columns: minmax(0px, min-content) auto minmax(0px, min-content);
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
    grid-template-columns: repeat(1, minmax(0, 1fr));
    grid-template-rows: var(--toolbar-height) auto minmax(var(--aside-height), auto);
    grid-template-areas: 
    'toolbar'
    'main'
    'aside';
    
    @variant @5xl/content {
      grid-template-columns: 1fr var(--aside-width);
      grid-template-rows: var(--toolbar-height) auto;
      grid-template-areas: 
      'toolbar toolbar'
      'main aside';
    }
  }

  .main {
    grid-area: main;
  }

  .aside {
    grid-area: aside;
  }
</style>