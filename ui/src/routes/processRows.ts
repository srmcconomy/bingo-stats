import { average } from "$lib/average";
import { median } from "$lib/median";
import { parseDuration } from "$lib/parseDuration";
import type { Board, Dictionary, Entry, Race } from "$lib/types";

export const processRows = ({
  boards,
  races,
  entries,
  filters,
}: {
  boards: Dictionary<Board>;
  races: Dictionary<Race>;
  entries: Dictionary<Entry>;
  filters: {
    version?: string;
    gameMode?: string;
    racer?: string;
    useMedian?: boolean;
  };
}) => {
  let totalEntries = 0;
  const data = new Map<
    string,
    {
      picks: number;
      times: number[];
      forfeits: number;
    }
  >();
  for (const [id, race] of Object.entries(races)) {
    if (filters.gameMode && race.gameMode !== filters.gameMode) {
      continue;
    }
    const board = boards[race.board];
    if (filters.version && board.version !== filters.version) {
      continue;
    }
    for (const entrant of race.entrants) {
      if (filters.racer && filters.racer !== entrant) {
        continue;
      }
      totalEntries++;
      const entry = entries[`${id}:${entrant}`];
      const rowData = data.get(entry.row ?? "blank") ?? {
        picks: 0,
        times: [],
        forfeits: 0,
      };
      rowData.picks++;
      if (entry.duration) {
        rowData.times.push(parseDuration(entry.duration));
      }
      if (entry.status !== "done") {
        rowData.forfeits++;
      }
      data.set(entry.row ?? "blank", rowData);
    }
  }

  return [...data.entries()].map(([row, rowData]) => ({
    row,
    pickPercent: rowData.picks / totalEntries,
    averageTime: filters.useMedian
      ? median(rowData.times)
      : average(rowData.times),
    forfeitPercent: rowData.forfeits / rowData.picks,
    picks: rowData.picks,
  }));
};
