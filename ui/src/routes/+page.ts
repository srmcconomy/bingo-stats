import { orderBy } from "$lib/orderBy";
import type { Board, Dictionary, Entry, Race } from "$lib/types.js";
import { processBoards } from "./processBoards.js";
import { processEntries } from "./processEntries.js";
import { processPlayers } from "./processPlayers.js";
import { processRows } from "./processRows.js";

export const load = async ({ fetch, url: { searchParams } }) => {
  const [boards, races, entries, lastUpdated] = await Promise.all([
    fetch("./api/boards.json").then((res) => res.json()) as Promise<
      Dictionary<Board>
    >,
    fetch("./api/races.json").then((res) => res.json()) as Promise<
      Dictionary<Race>
    >,
    fetch("./api/entries.json").then((res) => res.json()) as Promise<
      Dictionary<Entry>
    >,
    fetch("./api/lastUpdated.json").then((res) =>
      res.json(),
    ) as Promise<string>,
  ]);

  const version = searchParams.get("version") ?? undefined;
  const racer = searchParams.get("racer") ?? undefined;
  const minSampleSize = searchParams.get("minSampleSize") ?? undefined;

  const allVersions = [...new Set(Object.values(boards).map((b) => b.version))];
  const allRacers = [...new Set(Object.values(entries).map((b) => b.entrant))];
  allVersions.sort((a, b) => b.localeCompare(a));

  const goalEntryData = processEntries({
    boards,
    races,
    entries,
    filters: {
      version,
      racer,
    },
  });

  const goalBoardData = processBoards({
    boards,
    races,
    filters: {
      version,
    },
  });

  const rowData = processRows({
    boards,
    races,
    entries,
    filters: {
      version,
      racer,
    },
  });

  const racerData = processPlayers({
    boards,
    races,
    entries,
    filters: {
      version,
    },
  });

  const minSizeNum = parseInt(minSampleSize ?? "0");

  return {
    entriesByPickRateDesc: orderBy(
      goalEntryData.filter((g) => g.picks >= minSizeNum),
      (g) => g.pickPercent,
    ),
    entriesByPickRateAsc: orderBy(
      goalEntryData.filter((g) => g.picks >= minSizeNum),
      (g) => -g.pickPercent,
    ),
    entriesByForfeitRateDesc: orderBy(
      goalEntryData.filter((g) => g.picks >= minSizeNum),
      (g) => g.forfeitPercent,
    ),
    entriesByForfeitRateAsc: orderBy(
      goalEntryData.filter((g) => g.picks >= minSizeNum),
      (g) => -g.forfeitPercent,
    ),
    entriesByAverageTimeDesc: orderBy(
      goalEntryData
        .filter((g) => g.picks >= minSizeNum)
        .filter((g) => g.averageTime),
      (g) => g.averageTime,
    ),
    entriesByAverageTimeAsc: orderBy(
      goalEntryData
        .filter((g) => g.picks >= minSizeNum)
        .filter((g) => g.averageTime),
      (g) => -g.averageTime,
    ),
    boardsByAppearanceRateDesc: orderBy(
      goalBoardData,
      (g) => g.appearancePercent,
    ),
    boardsByAppearanceRateAsc: orderBy(
      goalBoardData,
      (g) => -g.appearancePercent,
    ),
    rowsByPickRateDesc: orderBy(
      rowData.filter((g) => g.picks >= minSizeNum),
      (g) => g.pickPercent,
    ),
    rowsByPickRateAsc: orderBy(
      rowData.filter((g) => g.picks >= minSizeNum),
      (g) => -g.pickPercent,
    ),
    rowsByForfeitRateDesc: orderBy(
      rowData.filter((g) => g.picks >= minSizeNum),
      (g) => g.forfeitPercent,
    ),
    rowsByForfeitRateAsc: orderBy(
      rowData.filter((g) => g.picks >= minSizeNum),
      (g) => -g.forfeitPercent,
    ),
    rowsByAverageTimeDesc: orderBy(
      rowData.filter((g) => g.picks >= minSizeNum),
      (g) => g.averageTime,
    ),
    rowsByAverageTimeAsc: orderBy(
      rowData.filter((g) => g.picks >= minSizeNum),
      (g) => -g.averageTime,
    ),
    racersByBlankRateDesc: orderBy(
      racerData.filter((g) => g.races >= minSizeNum),
      (g) => g.blankPercent,
    ),
    allVersions,
    version,
    racer,
    minSampleSize,
    allRacers,
    lastUpdated: new Date(lastUpdated),
  };
};
