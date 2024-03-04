import type { Board, Dictionary, Race } from "$lib/types";

export const processBoards = ({
  boards,
  races,
  filters,
}: {
  boards: Dictionary<Board>;
  races: Dictionary<Race>;
  filters: {
    version?: string;
  };
}) => {
  let totalBoards = 0;
  const goalBoardData = new Map<
    string,
    {
      appearances: number;
    }
  >();
  for (const race of Object.values(races)) {
    const board = boards[race.board];
    if (filters.version && board.version !== filters.version) {
      continue;
    }
    totalBoards++;
    for (const goal of board.goals.flat()) {
      const data = goalBoardData.get(goal) ?? { appearances: 0 };
      data.appearances++;
      goalBoardData.set(goal, data);
    }
  }

  return [...goalBoardData.entries()].map(([goal, data]) => ({
    goal,
    appearancePercent: data.appearances / totalBoards,
    appearances: data.appearances,
  }));
};
