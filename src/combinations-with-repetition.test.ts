/*
  The basic idea for the algorithm is take one element at a time and generate all combinations
  where this element occurs
    - 1 time
    - 2 time
    - ...
    - k times
  The cases where this element occurs 0 times is covered when generating combinations for the other elements,
  for example when the next element occurs k times.
*/
const nChooseK = <T>(elements: readonly T[], k: number): T[][] => {
  type Combination = T[];
  if (k === 0) {
    return [[]];
  }

  let result: Combination[] = [];
  const remainingElements: T[] = [...elements];
  for (;;) {
    const element = remainingElements.shift();
    if (element === undefined) {
      break;
    }
    for (let occursTimes = k; occursTimes > 0; occursTimes--) {
      const elementPrefix = Array.from({
        length: occursTimes,
      }).fill(element) as Combination;
      const subCombinations = nChooseK(remainingElements, k - occursTimes);
      const newCombinations: Combination[] = subCombinations.map(
        (subCombination) => elementPrefix.concat(subCombination)
      );
      result = result.concat(newCombinations);
    }
  }

  return result;
};

describe("nChooseK()", () => {
  it("returns the combinations with repetition for the given set", () => {
    const result = nChooseK<number>([1, 2, 3], 2);
    expect(result).toEqual([
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 2],
      [2, 3],
      [3, 3],
    ]);
  });

  it("handles n=2 and k=2", () => {
    const result = nChooseK<number>([1, 2], 2);
    expect(result).toEqual([
      [1, 1],
      [1, 2],
      [2, 2],
    ]);
  });

  it("handles n=1", () => {
    expect(nChooseK<number>([6], 3)).toEqual([[6, 6, 6]]);
  });

  it("handles k=0", () => {
    expect(nChooseK<number>([5, 6, 7, 8, 9], 0)).toEqual([[]]);
  });

  it("handles k=1", () => {
    const result = nChooseK<number>([5, 6, 7, 8, 9], 1);
    expect(result).toEqual([[5], [6], [7], [8], [9]]);
  });
});
