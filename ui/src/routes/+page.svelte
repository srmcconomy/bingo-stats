<script lang="ts">
  import { formatDuration } from "$lib/formatDuration";
  import DataList from "./DataList.svelte";
  import Select from "$lib/components/Select.svelte";
  import Input from "$lib/components/Input.svelte";
  import SelectInput from "$lib/components/SelectInput.svelte";
  import { goto } from "$app/navigation";
  import Header from "./Header.svelte";
  import "./styles.css";
  import { onMount } from "svelte";
  import { processData } from "./processData";
  import { loadData } from "./loadData";
  import Checkbox from "$lib/components/Checkbox.svelte";
  import { fade } from "svelte/transition";

  let data: ReturnType<typeof processData> | null = null;
  let searchParams: URLSearchParams | null = null;

  onMount(() => {
    searchParams = new URLSearchParams(window.location.search);
  });

  $: {
    if (searchParams) {
      loadData().then((d) => {
        data = processData({
          ...d,
          searchParams: searchParams!,
        });
      });
    }
  }

  const updateQueryParams = (key: string, value: string | undefined) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    searchParams = url.searchParams;
    goto(url);
  };
</script>

<svelte:head>
  <title>Ocarina of Time Bingo Stats</title>
  <meta name="description" content="Ocarina of Time Bingo Stats" />
</svelte:head>

{#if !data}
  <div class="load" out:fade>
    <svg
      width="20vmin"
      height="20vmin"
      viewBox="0 0 512 443.392"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#FFFFFF66"
        d="
				M 0 443.392 L 256 443.392 L 128 221.696 Z
				M 256 443.392 L 512 443.392 L 384 221.696 Z
				M 128 221.696 L 384 221.696 L 256 0 Z
				"
      /></svg
    >
  </div>
{:else}
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
        <Select
          label="Game Mode"
          value={data.gameMode}
          on:change={(e) => updateQueryParams("gameMode", e.detail)}
          options={[undefined, "bingo", "anti-bingo"]}
          getLabel={(v) => v ?? "All"}
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
        <Checkbox
          label="Use median"
          checked={data.useMedian}
          on:change={(e) =>
            updateQueryParams("useMedian", e.detail ? "true" : undefined)}
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
              fill: true,
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
              fill: true,
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
              fill: true,
            },
            {
              header: data.useMedian ? "Median time" : "Average time",
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
              fill: true,
            },
            {
              header: data.useMedian ? "Median time" : "Average time",
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
              fill: true,
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
              fill: true,
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
          title="Most popular goal combinations"
          data={data.goalCombosByPickRateDesc}
          columns={[
            {
              header: "Goal 1",
              render: (row) => row.goals[0],
              fill: true,
            },
            {
              header: "Goal 2",
              render: (row) => row.goals[1],
              fill: true,
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
          title="Least popular goal combinations"
          data={data.goalCombosByPickRateAsc}
          columns={[
            {
              header: "Goal 1",
              render: (row) => row.goals[0],
              fill: true,
            },
            {
              header: "Goal 2",
              render: (row) => row.goals[1],
              fill: true,
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
          title="Best goal combinations"
          data={data.goalCombosByAverageTimeAsc}
          columns={[
            {
              header: "Goal 1",
              render: (row) => row.goals[0],
              fill: true,
            },
            {
              header: "Goal 2",
              render: (row) => row.goals[1],
              fill: true,
            },
            {
              header: data.useMedian ? "Median time" : "Average time",
              render: (row) => formatDuration(row.averageTime),
            },
            {
              header: "Sample",
              render: (row) => `${row.picks}`,
            },
          ]}
        />
        <DataList
          title="Worst goal combinations"
          data={data.goalCombosByAverageTimeDesc}
          columns={[
            {
              header: "Goal 1",
              render: (row) => row.goals[0],
              fill: true,
            },
            {
              header: "Goal 2",
              render: (row) => row.goals[1],
              fill: true,
            },
            {
              header: data.useMedian ? "Median time" : "Average time",
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
            title="Most common goals"
            data={data.boardsByAppearanceRateDesc}
            columns={[
              {
                header: "Goal",
                render: (row) => row.goal,
                fill: true,
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
                fill: true,
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
              fill: true,
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
              fill: true,
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
              fill: true,
            },
            {
              header: data.useMedian ? "Median time" : "Average time",
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
              fill: true,
            },
            {
              header: data.useMedian ? "Median time" : "Average time",
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
                fill: true,
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
{/if}

<style lang="scss">
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .load {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #222222;
    & > svg {
      transform-origin: 50% 66.666%;
      animation: spin 2s linear infinite;
    }
  }
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
    padding: 0 16px;

    @media (max-width: 600px) {
      padding: 0 4px;
    }
  }
  .filters {
    display: flex;
    align-items: flex-start;
    gap: 32px;
    @media (max-width: 800px) {
      flex-direction: column;
      gap: 8px;
    }
  }
  .data {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    @media (min-width: 1032px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }
    flex-wrap: nowrap;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
</style>
