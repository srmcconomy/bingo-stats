import type { api } from "./racetimeApi";

export type Board = {
  version: string;
  goals: string[][];
};
export type Race = {
  timestamp: string;
  entrants: string[];
  board: string;
  gameMode: "bingo" | "anti-bingo";
};
export type Entry = {
  entrant: string;
  duration: string;
  status: api.EntrantStatus;
  comment: string | null;
  row: string | null;
};
