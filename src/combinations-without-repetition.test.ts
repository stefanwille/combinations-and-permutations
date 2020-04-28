const nChooseK = <T extends number>(elements: T[], k: number): T[][] => {
  type Combination = T[];
  if (k === 1) {
    return elements.map((element) => [element]);
  }
  if (k == elements.length) {
    return [elements];
  }

  const [firstElement, ...remainingElements] = elements;

  const combinationsOfSubElements = nChooseK(remainingElements, k - 1);
  const combinationsWithFirstElement: Combination[] = combinationsOfSubElements.map(
    (combination) => [firstElement, ...combination]
  );
  const combinationsWithoutFirstElement = nChooseK(remainingElements, k);
  const result: Combination[] = combinationsWithFirstElement.concat(
    combinationsWithoutFirstElement
  );
  return result;
};

describe("nChooseK()", () => {
  it("returns the combinations without repetition for the given set", () => {
    expect(nChooseK<number>([6, 7, 8], 2)).toEqual([
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

  it("handles k=n", () => {
    expect(nChooseK<number>([6, 7, 8], 3)).toEqual([[6, 7, 8]]);
    expect(nChooseK<number>([6, 7, 8, 9], 4)).toEqual([[6, 7, 8, 9]]);
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
});

export {};
