<script lang="ts" generics="T">
  import BaseSelect from "./BaseSelect.svelte";
  import { createEventDispatcher } from "svelte";

  export let label: string;
  export let value: T;
  export let options: T[];
  export let getValue: (option: T) => string;
  export let getLabel: (option: T) => string;

  let search = "";
  let isOpen = false;
  let input: HTMLInputElement;
  const dispatch = createEventDispatcher<{ change: T }>();
</script>

<BaseSelect
  {isOpen}
  {label}
  {value}
  options={options.filter((o) =>
    getLabel(o).toLowerCase().includes(search.toLowerCase()),
  )}
  {getLabel}
  {getValue}
  on:change={(e) => {
    isOpen = false;
    search = "";
    input.blur();
    dispatch("change", e.detail);
  }}
  on:clickOutside={() => {
    isOpen = false;
    input.blur();
  }}
>
  <input
    placeholder={getLabel(value)}
    bind:this={input}
    on:focus={() => (isOpen = true)}
    bind:value={search}
  />
</BaseSelect>

<style lang="scss">
  input {
    border: 0;
    color: inherit;
    background: #333333;
    height: 40px;
    padding: 0 16px;
    border-radius: 4px;
    outline: none;
  }
</style>
