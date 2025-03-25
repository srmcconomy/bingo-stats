<script lang="ts" generics="T">
  import BaseSelect from "./BaseSelect.svelte";

  const {
    label,
    value,
    options,
    getValue,
    getLabel,
    onchange,
  }: {
    label: string;
    value: T;
    options: T[];
    getValue: (option: T) => string;
    getLabel: (option: T) => string;
    onchange: (value: T) => void;
  } = $props();

  let search = $state("");
  let isOpen = $state(false);
  let input: HTMLInputElement;
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
  onchange={(val) => {
    isOpen = false;
    search = "";
    input.blur();
    onchange(val);
  }}
  onclickoutside={() => {
    isOpen = false;
    input.blur();
  }}
>
  <input
    placeholder={getLabel(value)}
    bind:this={input}
    onfocus={() => (isOpen = true)}
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
