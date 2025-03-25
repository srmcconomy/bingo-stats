<script lang="ts" generics="T">
  import Modal from "$lib/components/Modal.svelte";

  const {
    title,
    data,
    columns,
  }: {
    title: string;
    data: T[];
    columns: {
      header: string;
      render: (row: T) => string;
      fill?: boolean;
    }[];
  } = $props();

  let isModalOpen = $state(false);
</script>

<div class="container">
  <div class="title">{title}</div>
  <div
    class="grid"
    style="grid-template-columns: {columns
      .map((c) => (c.fill ? '1fr' : 'max-content'))
      .join(' ')};"
  >
    <div class="header">
      {#each columns as { header }}
        <div>{header}</div>
      {/each}
    </div>

    {#each data.slice(0, 5) as row}
      <div class="row">
        {#each columns as { render }}
          <div>{render(row)}</div>
        {/each}
      </div>
    {/each}
  </div>
  <button onclick={() => (isModalOpen = true)}
    >See all {data.length} rows</button
  >
</div>

{#if isModalOpen}
  <Modal onclose={() => (isModalOpen = false)}>
    <div class="title">{title}</div>
    <div
      class="grid modal"
      style="grid-template-columns: {columns
        .map((c) => (c.fill ? '1fr' : 'max-content'))
        .join(' ')};"
    >
      <div class="header">
        {#each columns as { header }}
          <div>{header}</div>
        {/each}
      </div>

      {#each data as row}
        <div class="row">
          {#each columns as { render }}
            <div>{render(row)}</div>
          {/each}
        </div>
      {/each}
    </div>
  </Modal>
{/if}

<style lang="scss">
  .title {
    font-size: 20px;
    color: white;
    font-family: Montserrat;
    margin-bottom: 8px;
    padding: 0 4px;
    color: #f7e279;
  }
  .container {
    background: #333333;
    padding: 4px;
  }
  .grid {
    display: grid;
    margin-bottom: 8px;
    grid-auto-rows: max-content;

    &.modal {
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
  .row {
    display: contents;

    &:nth-of-type(even) > div {
      background: #444444;
    }
    & > div {
      padding: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .header {
    display: contents;
    color: #ffffff66;
    font-weight: 600;
    font-size: 14px;
    & > div {
      padding: 4px;
    }
    .modal & > div {
      position: sticky;
      top: 0;
      background: #333333;
    }
  }
  button {
    background: inherit;
    border: 0;
    color: #ffffff66;
    font-family: inherit;
    font-size: 14px;
    cursor: pointer;
    padding: 4px;

    &:hover {
      color: #ffffffaa;
    }
    &:active {
      color: #ffffffcc;
    }
  }
</style>
