<div class="app grid min-h-screen">
  <header class="header bg-green-100">Header</header>
  <section class="left-pane bg-gray-100">Left pane</section>
  <main class="main bg-yellow-50">main</main>
  <aside class="aside bg-blue-50">Aside</aside>
</div>

<style>
  .app {
    grid-template: 
    'header header header' 70px
    'left-pane main aside' auto / 250px auto 250px;
  }

  .header {
    grid-area: header;
  }

  .left-pane {
    grid-area: left-pane;
  }

  .main {
    grid-area: main;
  }

  aside {
    grid-area: aside;
  }
</style>