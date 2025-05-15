<script lang="ts">
  import { page } from "$app/state";

  const { id } = $props();
  const link = $derived.by(() => {
    const params = new URLSearchParams(page.url.searchParams);
    params.append('preview', id);
    return '/?' + params.toString();
  });
</script>

<a href={link} class="@container/card flex w-full bg-white p-2" aria-label="{id}">
  <div class="w-full flex flex-col items-center gap-2 @sm/card:flex-row">
    <div class="size-20 bg-green-500 @xl/card:bg-pink-500 @xl/card:rounded-full"></div>
    <div>
      <span class="hidden @xl/card:block">Im a wide card</span>
      <span class="block @xl/card:hidden">Im a narrow card</span>
      <span>{id}</span>
    </div>
  </div>  
</a>