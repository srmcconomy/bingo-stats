<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  const {
    children,
    invertColours,
    ...props
  }: HTMLButtonAttributes & {
    children: Snippet;
    invertColours?: boolean;
  } = $props();
</script>

<button
  class={{
    invert: invertColours,
  }}
  {...props}>{@render children?.()}</button
>

<style lang="scss">
  button {
    background: #333333;
    border: 0;
    color: inherit;
    height: 40px;
    padding: 0 16px;
    border-radius: 4px;
    cursor: pointer;
    &.invert {
      background: #222222;
    }
  }
</style>
