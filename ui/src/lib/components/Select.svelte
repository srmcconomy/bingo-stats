<script lang="ts" generics="T">
  import BaseSelect from "./BaseSelect.svelte";
  import { createEventDispatcher } from "svelte";

  export let label: string;
  export let value: T;
  export let options: T[];
  export let getValue: (option: T) => string;
  export let getLabel: (option: T) => string;

  let isOpen = false;
  const dispatch = createEventDispatcher<{ change: T }>();
</script>

<BaseSelect
  {isOpen}
  {label}
  {value}
  {options}
  {getLabel}
  {getValue}
  on:change={(e) => {
    isOpen = false;
    dispatch("change", e.detail);
  }}
  on:clickOutside={() => {
    isOpen = false;
  }}
>
  <button class="toggle" on:click={() => (isOpen = !isOpen)}>
    {getLabel(value)}
  </button>
</BaseSelect>

<style lang="scss">
  .toggle {
    background: #333333;
    border: 0;
    color: inherit;
    height: 40px;
    padding: 0 16px;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
