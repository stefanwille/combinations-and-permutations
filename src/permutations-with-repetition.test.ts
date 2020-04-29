/*
The idea for this algorithm is to generate all permutations of n elements of length r by
going through all elements and for each element to generate all permutations of length r with the given element
in front.
To do so, we generate all permutations of length r-1 and prefix them with the current element.
*/
const permutations = (elements: readonly number[], r: number): number[][] => {
  let result: number[][] = [];

  if (r === 0) {
    return [[]];
  }

  const subPermutations: number[][] = permutations(elements, r - 1);
  for (let element of elements) {
    const permutationWithElement = subPermutations.map((subPermutation) => [
      element,
      ...subPermutation,
    ]);
    result = result.concat(permutationWithElement);
  }

  return result;
};

describe("permutations()", () => {
  it("returns all permutations with repetition of the given elements", () => {
    const result = permutations([1, 2], 2);
    expect(result).toEqual([
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 2],
    ]);
  });

  it("handles r=1", () => {
    const result = permutations([1, 2], 1);
    expect(result).toEqual([[1], [2]]);
  });

  it("handles r=0", () => {
    expect(permutations([1, 2], 0)).toEqual([[]]);
  });

  it("handles n=2/r=3", () => {
    const result = permutations([1, 2], 3);
    expect(result).toEqual([
      [1, 1, 1],
      [1, 1, 2],
      [1, 2, 1],
      [1, 2, 2],

      [2, 1, 1],
      [2, 1, 2],
      [2, 2, 1],
      [2, 2, 2],
    ]);
  });

  it("handles n=3/r=3", () => {
    const result = permutations([1, 2, 3], 3);
    expect(result).toEqual([
      [1, 1, 1],
      [1, 1, 2],
      [1, 1, 3],
      [1, 2, 1],
      [1, 2, 2],
      [1, 2, 3],
      [1, 3, 1],
      [1, 3, 2],
      [1, 3, 3],

      [2, 1, 1],
      [2, 1, 2],
      [2, 1, 3],
      [2, 2, 1],
      [2, 2, 2],
      [2, 2, 3],
      [2, 3, 1],
      [2, 3, 2],
      [2, 3, 3],

      [3, 1, 1],
      [3, 1, 2],
      [3, 1, 3],
      [3, 2, 1],
      [3, 2, 2],
      [3, 2, 3],
      [3, 3, 1],
      [3, 3, 2],
      [3, 3, 3],
    ]);
  });
});
