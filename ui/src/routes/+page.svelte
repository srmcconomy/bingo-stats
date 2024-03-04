<script lang="ts">
  import { formatDuration } from "$lib/formatDuration";
  import DataList from "./DataList.svelte";
  import Select from "$lib/components/Select.svelte";
  import Input from "$lib/components/Input.svelte";
  import SelectInput from "$lib/components/SelectInput.svelte";
  import { goto } from "$app/navigation";
  import Header from "./Header.svelte";
  import "./styles.css";

  export let data;

  const updateQueryParams = (key: string, value: string | undefined) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    goto(url);
  };
</script>

<svelte:head>
  <title>Ocarina of Time Bingo Stats</title>
  <meta name="description" content="Ocarina of Time Bingo Stats" />
</svelte:head>

<Header lastUpdated={data.lastUpdated} />

<main>
  <div class="container">
    <div class="filters">
      <Select
        label="Version"
        value={data.version}
        on:change={(e) => updateQueryParams("version", e.detail)}
        options={[undefined, ...data.allVersions]}
        getLabel={(v) => v ?? "All versions"}
        getValue={(v) => v ?? "all"}
      />
      <SelectInput
        label="Racer"
        value={data.racer}
        on:change={(e) => updateQueryParams("racer", e.detail)}
        options={[undefined, ...data.allRacers]}
        getLabel={(v) => v ?? "All racers"}
        getValue={(v) => v ?? "all"}
      />
      <Input
        label="Min. sample size"
        placeholder="0"
        value={data.minSampleSize ?? ""}
        on:change={(e) => updateQueryParams("minSampleSize", e.detail)}
      />
    </div>
    <div class="data">
      <DataList
        title="Most popular goals"
        data={data.entriesByPickRateDesc}
        columns={[
          {
            header: "Goal",
            render: (row) => row.goal,
          },
          {
            header: "Pick rate",
            render: (row) => Math.round(row.pickPercent * 100) + "%",
          },
          {
            header: "Sample",
            render: (row) => `${row.appearances}`,
          },
        ]}
      />

      <DataList
        title="Least popular goals"
        data={data.entriesByPickRateAsc}
        columns={[
          {
            header: "Goal",
            render: (row) => row.goal,
          },
          {
            header: "Pick rate",
            render: (row) => Math.round(row.pickPercent * 100) + "%",
          },
          {
            header: "Sample",
            render: (row) => `${row.appearances}`,
          },
        ]}
      />

      <DataList
        title="Best goals"
        data={data.entriesByAverageTimeAsc}
        columns={[
          {
            header: "Goal",
            render: (row) => row.goal,
          },
          {
            header: "Average time",
            render: (row) => formatDuration(row.averageTime),
          },
          {
            header: "Sample",
            render: (row) => `${row.picks}`,
          },
        ]}
      />
      <DataList
        title="Worst goals"
        data={data.entriesByAverageTimeDesc}
        columns={[
          {
            header: "Goal",
            render: (row) => row.goal,
          },
          {
            header: "Average time",
            render: (row) => formatDuration(row.averageTime),
          },
          {
            header: "Sample",
            render: (row) => `${row.picks}`,
          },
        ]}
      />

      <DataList
        title="Most frustrating goals"
        data={data.entriesByForfeitRateDesc}
        columns={[
          {
            header: "Goal",
            render: (row) => row.goal,
          },
          {
            header: "Forfeit rate",
            render: (row) => Math.round(row.forfeitPercent * 100) + "%",
          },
          {
            header: "Sample",
            render: (row) => `${row.picks}`,
          },
        ]}
      />

      <DataList
        title="Least frustrating goals"
        data={data.entriesByForfeitRateAsc}
        columns={[
          {
            header: "Goal",
            render: (row) => row.goal,
          },
          {
            header: "Forfeit rate",
            render: (row) => Math.round(row.forfeitPercent * 100) + "%",
          },
          {
            header: "Sample",
            render: (row) => `${row.picks}`,
          },
        ]}
      />

      {#if !data.racer}
        <DataList
          title="Most common goals"
          data={data.boardsByAppearanceRateDesc}
          columns={[
            {
              header: "Goal",
              render: (row) => row.goal,
            },
            {
              header: "Appearance rate",
              render: (row) => Math.round(row.appearancePercent * 100) + "%",
            },
          ]}
        />

        <DataList
          title="Least common goals"
          data={data.boardsByAppearanceRateAsc}
          columns={[
            {
              header: "Goal",
              render: (row) => row.goal,
            },
            {
              header: "Appearance rate",
              render: (row) => Math.round(row.appearancePercent * 100) + "%",
            },
          ]}
        />
      {/if}

      <DataList
        title="Most popular rows"
        data={data.rowsByPickRateDesc}
        columns={[
          {
            header: "Row",
            render: (row) => row.row,
          },
          {
            header: "Pick rate",
            render: (row) => `${Math.round(row.pickPercent * 100)}%`,
          },
          {
            header: "Sample",
            render: (row) => `${row.picks}`,
          },
        ]}
      />
      <DataList
        title="Least popular rows"
        data={data.rowsByPickRateAsc}
        columns={[
          {
            header: "Row",
            render: (row) => row.row,
          },
          {
            header: "Pick rate",
            render: (row) => `${Math.round(row.pickPercent * 100)}%`,
          },
          {
            header: "Sample",
            render: (row) => `${row.picks}`,
          },
        ]}
      />
      <DataList
        title="Best rows"
        data={data.rowsByAverageTimeAsc}
        columns={[
          {
            header: "Row",
            render: (row) => row.row,
          },
          {
            header: "Average time",
            render: (row) => formatDuration(row.averageTime),
          },
          {
            header: "Sample",
            render: (row) => `${row.picks}`,
          },
        ]}
      />
      <DataList
        title="Worst rows"
        data={data.rowsByAverageTimeDesc}
        columns={[
          {
            header: "Row",
            render: (row) => row.row,
          },
          {
            header: "Average time",
            render: (row) => formatDuration(row.averageTime),
          },
          {
            header: "Sample",
            render: (row) => `${row.picks}`,
          },
        ]}
      />

      {#if !data.racer}
        <DataList
          title="Most shameful racers"
          data={data.racersByBlankRateDesc}
          columns={[
            {
              header: "Racer",
              render: (row) => row.entrant.split("#")[0],
            },
            {
              header: "Blank rate",
              render: (row) => `${Math.round(row.blankPercent * 100)}%`,
            },
            {
              header: "Sample",
              render: (row) => `${row.races}`,
            },
          ]}
        />
      {/if}
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 1200px;
    margin: 32px 0;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  .filters {
    display: flex;
    align-items: flex-start;
    gap: 32px;
  }
  .data {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
  }
</style>
