<script lang="ts" generics="T">
  import BaseSelect from "./BaseSelect.svelte";
  import Button from "./Button.svelte";

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

  let isOpen = $state(false);
</script>

<BaseSelect
  {isOpen}
  {label}
  {value}
  {options}
  {getLabel}
  {getValue}
  onchange={(val) => {
    isOpen = false;
    onchange(val);
  }}
  onclickoutside={() => {
    isOpen = false;
  }}
>
  <Button onclick={() => (isOpen = !isOpen)}>
    {getLabel(value)}
  </Button>
</BaseSelect>
