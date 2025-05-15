<script lang="ts">
  import { throttle } from "$lib/utils/throttle";

  /**
   * Create a resizable panel by adding this component inside a relative positioned element 
   * and pass the 'side' you want to add the drag handle to. Use bindable 'width' to set parent size.
   */
  type DraggableProps = {
    width: number;
    side: 'left' | 'right'
    minWidth?: number;
    maxWidth?: number;
    collapseWidth?: number;
    isDragging?: boolean;
    disabled?: boolean;
    onDragEnd?: () => void;
    onCollapseWidth?: () => void;
  }

  let { 
    width = $bindable(0), 
    isDragging = $bindable(false), 
    minWidth = 200, 
    maxWidth = 400,
    collapseWidth,
    side = 'right',
    disabled = false,
    onDragEnd,
    onCollapseWidth
  }: DraggableProps = $props();

  let dragHandle: HTMLDivElement | undefined = $state();
  let parentRect = $derived(dragHandle?.parentElement?.getBoundingClientRect());
  const throttleTime = 25;

  function handlePointerDown(e: PointerEvent) {
    e.preventDefault();
    isDragging = true;

    const onPointerMove = (e: PointerEvent) => {
      if (disabled || !parentRect) {
        return;
      }

      const parentStart = side === 'right' ? parentRect?.left : parentRect?.right;
      const distance = Math.round(side === 'right' ? e.clientX - parentStart : parentStart - e.clientX);

      console.log(distance);

      if (collapseWidth && distance < collapseWidth) {
        onCollapseWidth?.();
        return;
      }
      width = Math.round(Math.min(Math.max(distance, minWidth), maxWidth));
    };

    const onPointerUp = () => {
      document.removeEventListener('pointermove', throttledOnPointerMove);
      isDragging = false;
      onDragEnd?.();
    };

    const throttledOnPointerMove = throttle(onPointerMove, throttleTime);

    document.addEventListener('pointermove', throttledOnPointerMove);
    document.addEventListener('pointerup', onPointerUp, { once: true });
  }
</script>

<!-- https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/ -->
<!-- https://github.com/w3c/aria-practices/issues/130#issuecomment-2301520761 -->
<div
  bind:this={dragHandle}
  class={[
    'draggable-btn absolute h-full w-4 cursor-col-resize top-0 -mx-2', 
    side === 'left' ? 'left-0' : 'right-0',
    disabled && 'hidden pointer-events-none' 
    ]}
  tabindex="0"
  aria-label="resize me"
  role="slider"
  aria-valuenow={width}
  aria-valuemin={minWidth}
  aria-valuemax={maxWidth}
  aria-orientation="vertical"
  aria-controls="something"
  onpointerdown={handlePointerDown}></div>

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
      right: -1px;
    }

    &:hover::after {
      opacity: 1;
    }
  }
</style>