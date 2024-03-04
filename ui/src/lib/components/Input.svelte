<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Label from "./Label.svelte";

  export let value: string;
  export let label: string;
  export let placeholder: string;
  const dispatch = createEventDispatcher<{ change: string }>();
</script>

<Label {label}>
  <input
    {value}
    on:change={(e) => dispatch("change", e.currentTarget.value)}
    {placeholder}
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
  }
</style>
