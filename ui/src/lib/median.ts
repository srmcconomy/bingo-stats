import { orderBy } from "./orderBy";

export const median = (arr: number[]) => {
  const sorted = orderBy(arr, (a) => a);
  if (arr.length % 2 === 0) {
    return (sorted[arr.length / 2 - 1] + sorted[arr.length / 2]) / 2;
  }
  return sorted[Math.floor(arr.length / 2)];
};
