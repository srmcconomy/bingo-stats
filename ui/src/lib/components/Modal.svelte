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
    <button class="close" on:click={() => dispatch("close")}>&times;</button>
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
    position: relative;

    @media (max-width: 600px) {
      max-height: unset;
      height: 100%;
      width: 100%;
      padding: 16px 4px;
      border-radius: 0;
      box-sizing: border-box;
    }

    .close {
      position: absolute;
      top: 0;
      right: 8px;
      color: inherit;
      background: unset;
      border: unset;
      font-size: 48px;
      font-weight: 200;
      height: 48px;
      width: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;

      &:hover {
        color: #ffffffff;
      }
      &:active {
        color: #ffffffff;
      }
    }
  }
</style>
