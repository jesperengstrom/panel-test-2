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
    { id: 56540 },
    { id: 97665 },
    { id: 18568 },
    { id: 73567 },
    { id: 85343 },
  ]

</script>

<div class="app grid min-h-screen max-w-screen overflow-x-hidden">
  <AppBar />
  <LeadingPane />
  <section class="content @container/content flex flex-col bg-white">
    <Toolbar>
      {#snippet leadingActions()}
        {#if !userSettings.leadingPane?.open}
          <button 
            id="open-leading-pane-btn"   
            class="hidden md:block" 
            in:fade={{ duration: 200 }} 
            onclick={() => userSettings.openLeadingPane()}>
            ➡️
          </button>
        {/if}
      {/snippet}
    </Toolbar>
    <div class="flex flex-col overflow-x-auto gap-4 @5xl/content:flex-row">
      <main class="main flex-1">
        <div class="flex flex-col gap-2 items-start p-2">
          <span class="text-xs text-gray-500">
            main
          </span>
          {#each searchResults as searchResult}
          <SearchResultCard id={searchResult.id} />
          {/each}
        </div>
      </main>
      <aside class="aside sticky top-0 p-2">
        <div class="bg-amber-100 h-full p-2 rounded-sm">
          <p class="text-xs text-gray-500">aside</p>
        </div>
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
      'leading-pane content trailing-panes';
  }
  
  .content {
    grid-area: content;
    max-height: calc(100vh - var(--app-bar-height));
  }

  .main {
  }

  .aside {
    min-width: var(--aside-width);
    min-height: var(--aside-height);
  }
</style>