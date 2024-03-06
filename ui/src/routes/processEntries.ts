import { average } from "$lib/average";
import { getRow } from "$lib/getRow";
import { median } from "$lib/median";
import { parseDuration } from "$lib/parseDuration";
import type { Board, Dictionary, Entry, Race } from "$lib/types";

export const processEntries = ({
  races,
  boards,
  entries,
  filters,
}: {
  races: Dictionary<Race>;
  boards: Dictionary<Board>;
  entries: Dictionary<Entry>;
  filters: {
    version?: string;
    gameMode?: string;
    racer?: string;
    useMedian?: boolean;
  };
}) => {
  const goalEntryData = new Map<
    string,
    {
      appearances: number;
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
      const entry = entries[`${id}:${entrant}`];
      if (entry.row) {
        const row = getRow(board.goals, entry.row);
        for (const goal of board.goals.flat()) {
          const data = goalEntryData.get(goal) ?? {
            appearances: 0,
            picks: 0,
            times: [],
            forfeits: 0,
          };
          data.appearances++;
          if (row.includes(goal)) {
            data.picks++;
            if (entry.status !== "done") {
              data.forfeits++;
            }
            if (entry.duration) {
              data.times.push(parseDuration(entry.duration));
            }
          }
          goalEntryData.set(goal, data);
        }
      }
    }
  }

  return [...goalEntryData.entries()].map(([goal, data]) => ({
    goal,
    pickPercent: data.picks / data.appearances,
    averageTime: filters.useMedian ? median(data.times) : average(data.times),
    forfeitPercent: data.forfeits / data.appearances,
    picks: data.picks,
    appearances: data.appearances,
    forfeits: data.forfeits,
  }));
};
