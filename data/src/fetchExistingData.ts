import type { Board, Entry, Race } from "./types";

export const fetchExistingData = async () => {
  try {
    const [boards, races, entries] = await Promise.all(
      [
        fetch("https://srmcconomy.github.io/bingo-stats/api/boards"),
        fetch("https://srmcconomy.github.io/bingo-stats/api/races"),
        fetch("https://srmcconomy.github.io/bingo-stats/api/entries"),
      ].map((p) => p.then((r) => r.json()))
    );
    return {
      boards: boards as { [key: string]: Board },
      races: races as { [key: string]: Race },
      entries: entries as { [key: string]: Entry },
    };
  } catch {
    return {
      boards: {},
      races: {},
      entries: {},
    };
  }
};
