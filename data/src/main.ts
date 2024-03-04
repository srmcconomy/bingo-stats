import { allBingoRaces } from "./allRaces";
import { fetchExistingData } from "./fetchExistingData";
import { generateBoard } from "./generateBoard";

const parseRow = (comment: string) => {
  const rowMatch = /\br(?:ow)?.?([1-5])\b/i.exec(comment);
  if (rowMatch) {
    return `row${rowMatch[1]}`;
  }
  const colMatch = /\bc(?:ol)?(?:umn)?.?([1-5])\b/i.exec(comment);
  if (colMatch) {
    return `col${colMatch[1]}`;
  }
  if (/\bbl.?tr\b/i.exec(comment)) {
    return "bltr";
  }
  if (/\btl.?br\b/i.exec(comment)) {
    return "tlbr";
  }
  return null;
};

const f = async () => {
  const {
    boards: boardStore,
    races: raceStore,
    entries: entryStore,
  } = await fetchExistingData();
  let mostRecentTime = 0;
  Object.values(raceStore).forEach((race) => {
    const time = new Date(race.timestamp).valueOf();
    if (time > mostRecentTime) {
      mostRecentTime = time;
    }
  });
  const races = await allBingoRaces(mostRecentTime);
  for (const race of races) {
    try {
      const url = new URL(race.info);
      const seed = +url.searchParams.get("seed")!;
      const version = url.searchParams.get("version")!;
      const board = await generateBoard(version, seed);
      boardStore[`${version}:${seed}`] = {
        version,
        goals: board,
      };
      raceStore[race.url] = {
        timestamp: race.opened_at,
        board: `${version}:${seed}`,
        entrants: race.entrants.map((e) => e.user.full_name),
      };
      for (const entrant of race.entrants) {
        const entryId = `${race.url}:${entrant.user.full_name}`;
        entryStore[entryId] = {
          entrant: entrant.user.full_name,
          duration: entrant.finish_time,
          comment: entrant.comment,
          status: entrant.status.value,
          row: entrant.comment ? parseRow(entrant.comment) : null,
        };
      }
    } catch {}
  }
  Bun.write("./out/boards.json", JSON.stringify(boardStore, null, 2));
  Bun.write("./out/races.json", JSON.stringify(raceStore, null, 2));
  Bun.write("./out/entries.json", JSON.stringify(entryStore, null, 2));
  Bun.write("./out/lastUpdated.json", JSON.stringify(new Date().toISOString()));
};

// f();
console.log(new Date().toISOString());
