export const getPosition = (vector: unknown[][], item: unknown): { row: number; col: number } | null => {
  for (let row = 0; row < vector.length; row++) {
    for (let col = 0; col < vector[0].length; col++) {
      if (vector[row][col] === item) {
        return { row, col };
      }
    }
  }
  return null;
};
