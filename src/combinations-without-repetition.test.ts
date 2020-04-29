/*
The idea for this algorithm is to go through each element and generate all combinations that involve this element.
Generating all combinations that involve a given element is done by
    - generating all subcombinations of length k-1 that don't involve the element or any of the previous elements
    - and add the element to them, resulting in all cominbations of length k that involve the element.
 */
const nChooseK = <T>(elements: T[], k: number): T[][] => {
  type Combination = T[];

  // Recursion anchor
  if (k === 0) {
    return [[]];
  }

  let result: Combination[] = [];
  const remainingElements = [...elements];
  for (;;) {
    const firstElement = remainingElements.shift();
    if (firstElement === undefined) {
      break;
    }

    const subCombinations = nChooseK(remainingElements, k - 1);
    const combinationsWithFirstElement: Combination[] = subCombinations.map(
      (combination) => [firstElement, ...combination]
    );
    result = result.concat(combinationsWithFirstElement);
  }
  return result;
};

describe("nChooseK()", () => {
  it("returns the combinations without repetition for the given set (with k=2)", () => {
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
