<script lang="ts" generics="T">
  import { quadInOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  import { type Snippet } from "svelte";
  import Label from "./Label.svelte";

  const {
    label,
    isOpen,
    value,
    options,
    getValue,
    getLabel,
    onchange,
    onclickoutside,
    children,
  }: {
    label: string;
    isOpen: boolean;
    value: T;
    options: T[];
    getValue: (option: T) => string;
    getLabel: (option: T) => string;
    onchange: (value: T) => void;
    onclickoutside: () => void;
    children: Snippet;
  } = $props();

  let wrapper: HTMLDivElement;

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapper && !wrapper.contains(e.target as Node)) {
      onclickoutside();
    }
  };
</script>

<svelte:document onclick={handleClickOutside} />
<Label {label}>
  <div class="relative-wrapper" bind:this={wrapper}>
    {@render children?.()}
    {#if isOpen}
      <div
        class="dropdown"
        transition:fly={{
          y: -8,
          duration: 200,
          easing: quadInOut,
        }}
      >
        {#each options as option}
          <button
            class:selected={getValue(option) === getValue(value)}
            onclick={() => {
              onchange(option);
            }}
          >
            {getLabel(option)}
          </button>
        {/each}
      </div>
    {/if}
  </div>
</Label>

<style lang="scss">
  .relative-wrapper {
    position: relative;
  }

  .dropdown {
    z-index: 10;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    background: #333333;
    max-height: 400px;
    overflow-y: auto;
    box-shadow:
      0 10px 20px rgba(0, 0, 0, 0.19),
      0 6px 6px rgba(0, 0, 0, 0.23);
    width: max-content;

    button {
      color: inherit;
      border: 0;
      background: unset;
      padding: 8px 16px;
      text-align: unset;
      cursor: pointer;

      @media (max-width: 600px) {
        padding: 16px;
      }

      &.selected {
        background: #444444;
      }
      &:hover {
        background: #555555;
      }
    }
  }
</style>
