const nChooseK = <T>(elements: readonly T[], k: number): T[][] => {
  type Combination = T[];
  const n = elements.length;
  if (k === 0) {
    return [[]];
  }

  if (n === 1) {
    const theOnlyElement = elements[0];
    const combination = Array.from({ length: k }).fill(
      theOnlyElement
    ) as Combination;
    const result = [combination];
    return result;
  }

  let result: Combination[] = [];
  const remainingElements: T[] = [...elements];
  for (;;) {
    const currentElement = remainingElements.shift();
    if (currentElement === undefined) {
      break;
    }
    for (
      let currentElementCount = k;
      currentElementCount > 0;
      currentElementCount--
    ) {
      const currentElementCombination = Array.from({
        length: currentElementCount,
      }).fill(currentElement) as Combination;
      const subCombinations = nChooseK(
        remainingElements,
        k - currentElementCount
      );
      const newCombinations = subCombinations.map((subCombination) =>
        currentElementCombination.concat(subCombination)
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
