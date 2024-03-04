<script lang="ts">
  export let label: string;
</script>

<label>
  <span>
    {label}
  </span>
  <slot />
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
