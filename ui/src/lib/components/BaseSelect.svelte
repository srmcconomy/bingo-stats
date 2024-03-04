<script lang="ts" generics="T">
  import { quadInOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  import { createEventDispatcher } from "svelte";
  import Label from "./Label.svelte";

  export let label: string;
  export let isOpen: boolean;
  export let value: T;
  export let options: T[];
  export let getValue: (option: T) => string;
  export let getLabel: (option: T) => string;

  let wrapper: HTMLDivElement;

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapper && !wrapper.contains(e.target as Node)) {
      dispatch("clickOutside");
    }
  };

  const dispatch = createEventDispatcher<{
    change: T;
    clickOutside: null;
  }>();
</script>

<svelte:document on:click={handleClickOutside} />
<Label {label}>
  <div class="relative-wrapper" bind:this={wrapper}>
    <slot />
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
            on:click={() => {
              dispatch("change", option);
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

    button {
      color: inherit;
      border: 0;
      background: unset;
      padding: 8px 16px;
      text-align: unset;
      cursor: pointer;

      &.selected {
        background: #444444;
      }
      &:hover {
        background: #555555;
      }
    }
  }
</style>
