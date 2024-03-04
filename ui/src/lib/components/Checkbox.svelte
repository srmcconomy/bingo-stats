<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let label: string;
  export let checked: boolean;
  const dispatchEvent = createEventDispatcher<{ change: boolean }>();
</script>

<label>
  <input
    type="checkbox"
    {checked}
    on:change={() => dispatchEvent("change", !checked)}
  />
  <div />
  <span>{label}</span>
</label>

<style lang="scss">
  input {
    opacity: 0;
    pointer-events: none;
    position: absolute;
  }
  div {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input:checked + div::before {
    content: "✔";
  }
  label {
    display: flex;
    gap: 4px;
    cursor: pointer;
    align-items: center;
    margin-top: 20px;
  }
  span {
    font-size: 14px;
  }
</style>
