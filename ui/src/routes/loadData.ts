import type { Dictionary, Board, Race, Entry } from "$lib/types";

export const loadData = async () => {
  const [boards, races, entries, lastUpdated] = await Promise.all([
    fetch("https://srmcconomy.github.io/bingo-stats/api/boards.json").then(
      (res) => res.json(),
    ) as Promise<Dictionary<Board>>,
    fetch("https://srmcconomy.github.io/bingo-stats/api/races.json").then(
      (res) => res.json(),
    ) as Promise<Dictionary<Race>>,
    fetch("https://srmcconomy.github.io/bingo-stats/api/entries.json").then(
      (res) => res.json(),
    ) as Promise<Dictionary<Entry>>,
    fetch("https://srmcconomy.github.io/bingo-stats/api/lastUpdated.json").then(
      (res) => res.json(),
    ) as Promise<string>,
  ]);

  return {
    boards,
    races,
    entries,
    lastUpdated,
  };
};
