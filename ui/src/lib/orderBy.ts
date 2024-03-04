export const orderBy = <T>(arr: T[], fn: (a: T) => number | string) => {
  const newArr = [...arr];
  newArr.sort((a, b) => {
    const aVal = fn(a);
    const bVal = fn(b);
    if (aVal < bVal) {
      return 1;
    }
    if (aVal > bVal) {
      return -1;
    }
    return 0;
  });
  return newArr;
};
