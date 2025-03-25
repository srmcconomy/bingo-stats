<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Input from "$lib/components/Input.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import { flip } from "svelte/animate";
  import { fade, scale } from "svelte/transition";

  const {
    onchange,
    raceIDs,
  }: {
    onchange: (ids: Set<string>) => void;
    raceIDs: Set<string> | undefined;
  } = $props();
  const racetimeRegex = /https:\/\/racetime.gg\/oot\/([a-zA-Z0-9-]+)/g;
  let isModalOpen = $state(false);
  let inputValue = $state("");
  let localRaceIDs = $state<Set<string> | null>(null);
  const ids = $derived(localRaceIDs ?? raceIDs ?? new Set<string>());
  const parseRaceIDs = () => {
    const newIDs = [...inputValue.matchAll(racetimeRegex)].map(
      (match) => match[1],
    );
    localRaceIDs = new Set([...ids, ...newIDs]);
    inputValue = "";
  };
  const handleClose = () => {
    if (localRaceIDs) {
      onchange(localRaceIDs);
      localRaceIDs = null;
    }
    isModalOpen = false;
  };
</script>

<Button onclick={() => (isModalOpen = true)}>
  {#if raceIDs}
    Filtering {raceIDs.size} races...
  {:else}
    Filter by race id...
  {/if}
</Button>
{#if isModalOpen}
  <Modal onclose={handleClose}>
    <div class="title">Filter races</div>
    <div class="body">
      <div>
        Paste race URLs from racetime.gg here. You can paste them directly from
        a spreadsheet
      </div>
      <Input
        invertColours
        label="Race URLs"
        value={inputValue}
        onchange={(v) => (inputValue = v)}
        onblur={parseRaceIDs}
        onkeydown={(e) => {
          if (e.key === "Enter") {
            parseRaceIDs();
          }
        }}
      />
      <Button invertColours onclick={() => (localRaceIDs = new Set())}
        >Clear all</Button
      >
      <div class="list">
        {#each ids as raceID (raceID)}
          <div
            class="tag"
            animate:flip={{
              duration: 200,
            }}
          >
            {raceID}
            <button
              onclick={() => {
                const newIDs = new Set(ids);
                newIDs.delete(raceID);
                localRaceIDs = newIDs;
              }}>×</button
            >
          </div>
        {/each}
      </div>
    </div>
  </Modal>
{/if}

<style>
  .body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
  .title {
    font-size: 20px;
    color: white;
    font-family: Montserrat;
    margin-bottom: 8px;
    color: #f7e279;
  }
  .tag {
    height: 20px;
    border-radius: 10px;
    padding: 0 8px;
    background: #444444;
    button {
      background: none;
      border: 0;
      cursor: pointer;
      color: inherit;
      cursor: pointer;
      padding: 0;
      margin: 0;
      &:hover {
        color: white;
      }
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    max-width: 1000px;
    gap: 4px;
    margin-top: 16px;
  }
</style>
