export type Board = {
  version: string;
  goals: string[][];
};

export type Race = {
  timestamp: string;
  entrants: string[];
  board: string;
  gameMode: string;
};

export type Entry = {
  entrant: string;
  duration: string;
  status: string;
  comment: string | null;
  row: string | null;
};

export type Dictionary<T> = {
  [key: string]: T;
};
