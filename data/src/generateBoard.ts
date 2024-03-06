const memoize = <P extends any[], R>(
  fn: (...args: P) => R,
  getKey: (...args: P) => string
) => {
  const map = new Map<string, R>();
  return (...args: P): R => {
    const key = getKey(...args);
    const cached = map.get(key);
    if (cached) {
      return cached;
    }
    const value = fn(...args);
    map.set(key, value);
    return value;
  };
};

const fetchVersions = memoize(
  async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/ootbingo/bingo/develop/api/v1/available_versions.json"
    );
    return ((await response.json()) as { versions: { [key: string]: string } })
      .versions;
  },
  () => ""
);

const fetchVersionPath = memoize(
  async (version: string) => {
    const versionPaths = await fetchVersions();
    const path = versionPaths[version];
    if (!path) {
      throw new Error(`Version ${version} not found`);
    }
    return path;
  },
  (version) => version
);

const fetchGoalList = memoize(
  async (version: string) => {
    const path = await fetchVersionPath(version);
    const response = await fetch(
      `https://raw.githubusercontent.com/ootbingo/bingo/develop/${path}/goal-list.js`
    );
    return new Function(`${await response.text()}; return bingoList;`)() as {
      name: string;
    }[];
  },
  (version) => version
);

const fetchGenerator = memoize(
  async (version: string) => {
    const path = await fetchVersionPath(version);
    const response = await fetch(
      `https://raw.githubusercontent.com/ootbingo/bingo/develop/${path}/generator.js`
    );
    return new Function(
      `${await response.text()}; return typeof BingoLibrary === 'undefined' ? ootBingoGenerator : BingoLibrary.ootBingoGenerator;`
    )() as (
      goalList: { name: string }[],
      options: { seed: string; mode: string; lang: string }
    ) => { name: string }[];
  },
  (version) => version
);

const fetchSeedRandom = memoize(
  async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/ootbingo/bingo/develop/lib/seedrandom-min.js"
    );
    new Function(await response.text())();
  },
  () => ""
);

export const generateBoard = async (version: string, seed: number) => {
  const [goalList, generator] = await Promise.all([
    fetchGoalList(version),
    fetchGenerator(version),
    fetchSeedRandom(),
  ]);

  const board = generator(goalList, {
    seed: `${seed}`,
    mode: "normal",
    lang: "name",
  })
    .slice(1)
    .map((goal) => goal.name);

  return [
    board.slice(0, 5),
    board.slice(5, 10),
    board.slice(10, 15),
    board.slice(15, 20),
    board.slice(20, 25),
  ];
};
