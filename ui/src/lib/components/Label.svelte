<script lang="ts">
  import type { Snippet } from "svelte";

  const {
    label,
    children,
  }: {
    label: string;
    children: Snippet;
  } = $props();
</script>

<label>
  <span>
    {label}
  </span>
  {@render children?.()}
</label>

<style lang="scss">
  label {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  span {
    font-size: 14px;
  }
</style>
