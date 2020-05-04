/*
Algorithm:
   Begin with all pairs of combintaions with length 0 and all remaining elements.
   Then for each pair, generate all pairs with combinations of length 1 and
   remaining elements.
   Go on until we reached k and returns all combinations from the pairs.
*/
const nChooseK = <T>(elements: readonly T[], k: number): T[][] => {
  type Combination = T[];
  type RemainingElements = T[];
  type Pair = {
    readonly combination: Combination;
    readonly remainingElements: RemainingElements;
  };

  if (elements.length < k) {
    return [];
  }

  let pairs: Pair[] = [{ combination: [], remainingElements: [...elements] }];
  let currentK = 0;
  let newPairs: Pair[] = [];
  while (currentK < k) {
    for (let pair of pairs) {
      // Generate all pairs with combinations of length currentK + 1
      const remainingElements = [...pair.remainingElements];
      for (;;) {
        const currentElement: T | undefined = remainingElements.shift();
        if (currentElement === undefined) {
          break;
        }
        const newPair = {
          combination: [...pair.combination, currentElement],
          remainingElements: [...remainingElements],
        };
        newPairs.push(newPair);
      }
    }
    pairs = newPairs;
    newPairs = [];
    currentK++;
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
