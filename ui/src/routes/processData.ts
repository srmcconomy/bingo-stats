import { orderBy } from "$lib/orderBy";
import type { Board, Dictionary, Entry, Race } from "$lib/types.js";
import { processBoards } from "./processBoards.js";
import { processEntries } from "./processEntries.js";
import { processGoalCombinations } from "./processGoalCombinations.js";
import { processPlayers } from "./processPlayers.js";
import { processRows } from "./processRows.js";

export const processData = ({
  boards,
  races,
  entries,
  lastUpdated,
  searchParams,
}: {
  boards: Dictionary<Board>;
  races: Dictionary<Race>;
  entries: Dictionary<Entry>;
  lastUpdated: string;
  searchParams: URLSearchParams;
}) => {
  const version = searchParams.get("version") ?? undefined;
  const gameMode = searchParams.get("gameMode") ?? undefined;
  const racer = searchParams.get("racer") ?? undefined;
  const minSampleSize = searchParams.get("minSampleSize") ?? undefined;
  const useMedian = searchParams.get("useMedian") === "true" ? true : false;

  const allVersions = [...new Set(Object.values(boards).map((b) => b.version))];
  const allRacers = [...new Set(Object.values(entries).map((b) => b.entrant))];
  allVersions.sort((a, b) => b.localeCompare(a));

  const goalEntryData = processEntries({
    boards,
    races,
    entries,
    filters: {
      version,
      gameMode,
      racer,
      useMedian,
    },
  });

  const goalBoardData = processBoards({
    boards,
    races,
    filters: {
      version,
      gameMode,
    },
  });

  const rowData = processRows({
    boards,
    races,
    entries,
    filters: {
      version,
      gameMode,
      racer,
      useMedian,
    },
  });

  const racerData = processPlayers({
    boards,
    races,
    entries,
    filters: {
      version,
      gameMode,
    },
  });

  const goalCombinationData = processGoalCombinations({
    boards,
    races,
    entries,
    filters: {
      version,
      gameMode,
      racer,
      useMedian,
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
    goalCombosByPickRateDesc: orderBy(
      goalCombinationData.filter((g) => g.picks >= minSizeNum),
      (g) => g.pickPercent,
    ),
    goalCombosByPickRateAsc: orderBy(
      goalCombinationData.filter((g) => g.picks >= minSizeNum),
      (g) => -g.pickPercent,
    ),
    goalCombosByForfeitRateDesc: orderBy(
      goalCombinationData.filter((g) => g.picks >= minSizeNum),
      (g) => g.forfeitPercent,
    ),
    goalCombosByForfeitRateAsc: orderBy(
      goalCombinationData.filter((g) => g.picks >= minSizeNum),
      (g) => -g.forfeitPercent,
    ),
    goalCombosByAverageTimeDesc: orderBy(
      goalCombinationData
        .filter((g) => g.picks >= minSizeNum)
        .filter((g) => g.averageTime),
      (g) => g.averageTime,
    ),
    goalCombosByAverageTimeAsc: orderBy(
      goalCombinationData
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
    gameMode,
    racer,
    minSampleSize,
    allRacers,
    lastUpdated: new Date(lastUpdated),
    useMedian,
  };
};
