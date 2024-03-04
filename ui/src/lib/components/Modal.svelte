<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { quadInOut } from "svelte/easing";

  const dispatch = createEventDispatcher<{ close: void }>();
</script>

<div class="container">
  <button
    class="backdrop"
    transition:fade={{ duration: 200, easing: quadInOut }}
    on:click={() => dispatch("close")}
  />
  <div
    class="modal"
    transition:fly={{ duration: 200, easing: quadInOut, y: -50 }}
  >
    <slot />
  </div>
</div>

<style lang="scss">
  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  .backdrop {
    backdrop-filter: blur(2px);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    border: 0;
    outline: none;
    z-index: -1;
  }
  .modal {
    background: #333333;
    border-radius: 32px;
    padding: 32px;
    z-index: 10;
    box-shadow:
      0 19px 38px rgba(0, 0, 0, 0.3),
      0 15px 12px rgba(0, 0, 0, 0.22);
    max-height: 80vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
</style>
