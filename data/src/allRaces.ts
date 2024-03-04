import { api } from "./racetimeApi";

export const allBingoRaces = async (fetchAfter: number = 0) => {
  let page = 1;
  const fullList: api.Race[] = [];
  outer: for (;;) {
    console.log("fetching page", page);
    const { races, num_pages } = await api.races(page);
    for (const race of races) {
      if (new Date(race.opened_at).valueOf() <= fetchAfter) {
        break outer;
      }
      try {
        const url = new URL(race.info);
        if (
          url.host === "ootbingo.github.io" &&
          url.pathname === "/bingo/bingo.html" &&
          url.searchParams.has("seed") &&
          url.searchParams.get("mode") === "normal"
        ) {
          fullList.push(race);
        }
      } catch {}
    }
    if (num_pages === page) {
      break;
    }
    page++;
  }

  return fullList;
};
