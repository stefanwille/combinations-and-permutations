/*
Algorithm:
   Begin with all pairs of combintaions with length 0 and all remaining elements.
   Then for each pair, generate all pairs with combinations of length 1 and
   remaining elements.
   Go on until we reached k and return all combinations from the pairs.
*/
const nChooseK = <T>(elements: readonly T[], k: number): T[][] => {
  type Combination = T[];
  type RemainingElements = T[];
  type Pair = {
    combination: Combination;
    remainingElements: RemainingElements;
  };

  // If we have less elements than k, then can generate 0 combinations that have length k.
  if (elements.length < k) {
    return [];
  }

  let pairs: Pair[] = [{ combination: [], remainingElements: [...elements] }];
  let newPairs: Pair[] = [];
  // Iterate k times to get combinations with length of k,
  // because we start with one combination of length 0
  // and each iteration makes our combinations one element longer.
  for (let iteration = 0; iteration < k; iteration++) {
    // For each pair we currently have, generate all pairs with combinations of length currentK + 1.
    for (let pair of pairs) {
      // Generate all pairs that have the current pair's combination as prefix.
      const remainingElements = [...pair.remainingElements];
      for (;;) {
        const currentElement: T | undefined = remainingElements.shift();
        if (currentElement === undefined) {
          break;
        }
        const newCombination = [...pair.combination, currentElement];
        const newPair = {
          combination: newCombination,
          remainingElements: [...remainingElements],
        };
        newPairs.push(newPair);
      }
    }
    pairs = newPairs;
    newPairs = [];
  }

  // Returns all combinations from the pairs
  const combinations: Combination[] = pairs.map((pair) => pair.combination);
  return combinations;
};

describe("nChooseK()", () => {
  it("returns the combinations without repetition for the given set (with k=2)", () => {
    const result = nChooseK<number>([6, 7, 8], 2);
    expect(result).toEqual([
      [6, 7],
      [6, 8],
      [7, 8],
    ]);
  });

  it("handles k=3", () => {
    expect(nChooseK<number>([5, 6, 7, 8], 3)).toEqual([
      [5, 6, 7],
      [5, 6, 8],
      [5, 7, 8],
      [6, 7, 8],
    ]);
  });

  it("handles k=0", () => {
    expect(nChooseK<number>([6, 7, 8], 0)).toEqual([[]]);
  });

  it("handles k=1", () => {
    expect(nChooseK<number>([6, 7, 8], 1)).toEqual([[6], [7], [8]]);
    expect(nChooseK<number>([6, 7, 8, 9], 1)).toEqual([[6], [7], [8], [9]]);
    expect(nChooseK<number>([5, 6, 7, 8, 9], 1)).toEqual([
      [5],
      [6],
      [7],
      [8],
      [9],
    ]);
  });

  it("handles k=n", () => {
    expect(nChooseK<number>([6, 7, 8], 3)).toEqual([[6, 7, 8]]);
    expect(nChooseK<number>([6, 7, 8, 9], 4)).toEqual([[6, 7, 8, 9]]);
  });
});

export {};
