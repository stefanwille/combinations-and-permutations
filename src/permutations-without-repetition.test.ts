/*
The idea for this algorithm:

Iterate through the given elements. For each element, generate all permutations
that begin with the element and add them to the result.

To generate the permutations begin with a certain element,
generate all permutation of length r-1 of the given elements without the current element,
and then prefix them with the current element.
*/
const permutations = <T>(elements: readonly T[], r: number): T[][] => {
  // Recursion anchor
  if (r === 0) {
    return [[]];
  }

  let result: T[][] = [];

  for (let index = 0; index < elements.length; index++) {
    const currentElement = elements[index];
    const elementsWithoutCurrentElement = [...elements].splice(index, 1);
    const permutationsWithoutCurrentElement = permutations(
      elementsWithoutCurrentElement,
      r - 1
    );
    const permutationsBeginningWithCurrentElement = permutationsWithoutCurrentElement.map(
      (permutation) => [currentElement, ...permutation]
    );
    result = result.concat(permutationsBeginningWithCurrentElement);
  }

  return result;
};

describe("permutation() without repetition", () => {
  it("returns all permutations of the given elements without repetitions", () => {
    const result = permutations([1, 2, 3], 2);
    expect(result).toEqual([
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 3],
      [3, 1],
      [3, 2],
    ]);
  });

  it("works with r=0", () => {
    const result = permutations([1, 2, 3], 0);
    expect(result).toEqual([[]]);
  });

  it("works with r=1", () => {
    const result = permutations([1, 2, 3], 1);
    expect(result).toEqual([[1], [2], [3]]);
  });

  it("works with r=3", () => {
    const result = permutations([1, 2, 3], 3);
    expect(result).toEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ]);
  });
});

export {};
