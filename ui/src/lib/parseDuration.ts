export const parseDuration = (duration: string) => {
  const res = /P([\d.]+)DT([\d.]+)H([\d.]+)M([\d.]+)S/.exec(duration);
  if (!res) {
    throw new Error(`Invalid duration: ${duration}`);
  }
  return +res[1] * 24 * 60 * 60 + +res[2] * 60 * 60 + +res[3] * 60 + +res[4];
};
