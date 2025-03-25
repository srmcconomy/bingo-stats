<script lang="ts">
  const {
    label,
    checked,
    onchange,
  }: {
    label: string;
    checked: boolean;
    onchange: (value: boolean) => void;
  } = $props();
</script>

<label>
  <input type="checkbox" {checked} onchange={() => onchange(!checked)} />
  <div></div>
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
  }
  span {
    font-size: 14px;
  }
</style>
