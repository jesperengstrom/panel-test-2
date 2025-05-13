<script lang="ts">
  type DraggableProps = {
    children: any;
    side: 'left' | 'right'
  }
  let { children, side }: DraggableProps = $props();
  let isDragging = false;
  let width = $state(200);
  let minWidth = 50;
  let maxWidth = 500;
  let onDragEnd = () => {};

  function handlePointerDown(e: PointerEvent) {
    e.preventDefault();
    isDragging = true;

    const onPointerMove = (e: PointerEvent) => {
      if (e.clientX < 50) {
        // isOpen = false;
        width = 0;
      } else {
        // isOpen = true
      }

      let pos = 0;
      if (side === 'right') {
        width = Math.min(Math.max(e.clientX, minWidth), maxWidth);
      }
      if (side === 'left') {
        width = Math.min(Math.max(document.body.clientWidth - e.clientX, minWidth), maxWidth);
      }
    };

    const onPointerUp = () => {
      document.removeEventListener('pointermove', onPointerMove);
      isDragging = false;
      onDragEnd();
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp, { once: true });
  }

</script>

{#snippet button()}
  <button class="draggable-btn relative w-4 cursor-col-resize -mx-2" aria-label="resize me" onpointerdown={handlePointerDown}></button>
{/snippet}

<div class="draggable flex h-full items-stretch">
  {#if side == 'left'}
    {@render button()}
  {/if}
  <div class="flex-1" style="width:{width}px">
    {@render children()}
  </div>
  {#if side === 'right'}
    {@render button()}
  {/if}
</div>

<style lang="postcss">
  @reference 'tailwindcss';

  .draggable-btn {

    &::before {
      width: 1px;
      height: auto;
      z-index: 2;
      background-color: var(--color-neutral-200);
    }

    &::after {
      width: 11px;
      background-color: --alpha(var(--color-neutral-500) / 10%);
      opacity: 0;
      transition: opacity .5s;
      border-radius: 3px;
    }

    &::before, &::after {
      content: '';
      margin: auto;
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0;
      right: 0;
    }

    &:hover::after {
      opacity: 1;
    }
  }
</style>