import { api } from "./racetimeApi";

const parseInfo = (info: string) => {
  const { urlStr, gameMode } = info.startsWith("Anti-Bingo ")
    ? { urlStr: info.split(" ")[1], gameMode: "anti-bingo" as const }
    : { urlStr: info, gameMode: "bingo" as const };

  const url = new URL(urlStr);
  const versionRegex = /^\/bingo\/v(.+)\/bingo.html$/;
  const versionMatch = versionRegex.exec(url.pathname);
  const version = versionMatch
    ? versionMatch[1]
    : url.searchParams.get("version");
  const seed = url.searchParams.get("seed");
  if (
    version &&
    seed &&
    url.searchParams.get("mode") === "normal" &&
    url.host === "ootbingo.github.io" &&
    (versionMatch || url.pathname === "/bingo/bingo.html")
  ) {
    return { version, seed: +seed, gameMode };
  }
  return null;
};

export const allBingoRaces = async (fetchAfter: number = 0) => {
  let page = 1;
  const fullList: {
    version: string;
    seed: number;
    gameMode: "bingo" | "anti-bingo";
    race: api.Race;
  }[] = [];
  outer: for (;;) {
    console.log("fetching page", page);
    const { races, num_pages } = await api.races(page);
    for (const race of races) {
      if (new Date(race.opened_at).valueOf() <= fetchAfter) {
        break outer;
      }
      try {
        const data = parseInfo(race.info);
        if (data) {
          fullList.push({
            ...data,
            race,
          });
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
