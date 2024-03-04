import type { Board, Dictionary, Entry, Race } from "$lib/types";

export const processPlayers = ({
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
  };
}) => {
  const map = new Map<
    string,
    {
      races: number;
      blanks: number;
      forfeits: number;
    }
  >();
  for (const [id, race] of Object.entries(races)) {
    const board = boards[race.board];
    if (filters.version && board.version !== filters.version) {
      continue;
    }
    for (const entrant of race.entrants) {
      const entry = entries[`${id}:${entrant}`];
      const data = map.get(entrant) ?? {
        races: 0,
        blanks: 0,
        forfeits: 0,
      };
      data.races++;
      if (!entry.row) {
        data.blanks++;
      }
      if (entry.status !== "done") {
        data.forfeits++;
      }
      map.set(entrant, data);
    }
  }

  return [...map.entries()].map(([entrant, data]) => ({
    entrant,
    forfeitPercent: data.forfeits / data.races,
    blankPercent: data.blanks / data.races,
    races: data.races,
  }));
};
