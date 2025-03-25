<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import Label from "./Label.svelte";

  const {
    label,
    onchange,
    invertColours,
    ...rest
  }: {
    label: string;
    onchange: (value: string) => void;
    invertColours?: boolean;
  } & Omit<HTMLInputAttributes, "onchange"> = $props();
</script>

<Label {label}>
  <input
    class={{
      invert: invertColours,
    }}
    onchange={(e) => onchange(e.currentTarget.value)}
    {...rest}
  />
</Label>

<style lang="scss">
  input {
    border: 0;
    color: inherit;
    background: #333333;
    height: 40px;
    padding: 0 16px;
    border-radius: 4px;
    outline: none;

    &.invert {
      background: #222222;
    }
  }
</style>
