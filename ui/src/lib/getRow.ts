export const getRow = (board: string[][], row: string) => {
  if (row.startsWith("row")) {
    return board[+row[3] - 1];
  }
  if (row.startsWith("col")) {
    return board.map((r) => r[+row[3] - 1]);
  }
  if (row === "tlbr") {
    return board.map((r, i) => r[i]);
  }
  if (row === "bltr") {
    return board.map((r, i) => r[4 - i]);
  }
  throw new Error(`Invalid row: ${row}`);
};
