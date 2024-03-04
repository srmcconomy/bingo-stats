import { average } from "$lib/average";
import { getRow } from "$lib/getRow";
import { median } from "$lib/median";
import { parseDuration } from "$lib/parseDuration";
import type { Dictionary, Race, Board, Entry } from "$lib/types";

const rowNames = [
  "row1",
  "row2",
  "row3",
  "row4",
  "row5",
  "col1",
  "col2",
  "col3",
  "col4",
  "col5",
  "tlbr",
  "bltr",
];

export const processGoalCombinations = ({
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
      goals: string[];
    }
  >();
  for (const [id, race] of Object.entries(races)) {
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
        for (const rowName of rowNames) {
          const row = getRow(board.goals, rowName);
          for (const goal1 of row) {
            for (const goal2 of row) {
              if (goal1 === goal2) {
                continue;
              }
              const sortedGoals = [goal1, goal2].sort();
              const key = sortedGoals.join(":");
              const data = goalEntryData.get(key) ?? {
                appearances: 0,
                picks: 0,
                times: [],
                forfeits: 0,
                goals: sortedGoals,
              };
              data.appearances++;
              if (entry.row === rowName) {
                data.picks++;
                if (entry.status !== "done") {
                  data.forfeits++;
                }
                if (entry.duration) {
                  data.times.push(parseDuration(entry.duration));
                }
              }
              goalEntryData.set(key, data);
            }
          }
        }
      }
    }
  }

  return [...goalEntryData.values()].map((data) => ({
    goals: data.goals,
    pickPercent: data.picks / data.appearances,
    averageTime: filters.useMedian ? median(data.times) : average(data.times),
    forfeitPercent: data.forfeits / data.appearances,
    picks: data.picks,
    appearances: data.appearances,
    forfeits: data.forfeits,
  }));
};
