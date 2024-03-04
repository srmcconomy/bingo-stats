import type { Dictionary, Board, Race, Entry } from "$lib/types";

export const loadData = async () => {
  const [boards, races, entries, lastUpdated] = await Promise.all([
    fetch("http://localhost:3001/boards.json").then((res) =>
      res.json(),
    ) as Promise<Dictionary<Board>>,
    fetch("http://localhost:3001/races.json").then((res) =>
      res.json(),
    ) as Promise<Dictionary<Race>>,
    fetch("http://localhost:3001/entries.json").then((res) =>
      res.json(),
    ) as Promise<Dictionary<Entry>>,
    fetch("http://localhost:3001/lastUpdated.json").then((res) =>
      res.json(),
    ) as Promise<string>,
  ]);

  return {
    boards,
    races,
    entries,
    lastUpdated,
  };
};
