import type { Dictionary, Board, Race, Entry } from "$lib/types";

export const loadData = async () => {
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

  return {
    boards,
    races,
    entries,
    lastUpdated,
  };
};
