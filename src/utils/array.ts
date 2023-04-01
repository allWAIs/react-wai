export const isSameArray = (arr1: unknown[], arr2: unknown[]): boolean => {
  return arr1.length === arr2.length && arr1.every((val, idx) => val === arr2[idx]);
};
