const nChooseK = <T extends number>(elements: T[], k: number): T[][] => {
	type Combination = T[];
	const n = elements.length;
	if (k === 1) {
		return elements.map((element) => [ element ]);
	}

	if (n === 1) {
		const theOnlyElement = elements[0];
		const combination = Array.from({ length: k }).fill(theOnlyElement) as Combination;
		const result = [ combination ];
		return result;
	}

	let result: Combination[] = [];
	const remainingElements: T[] = [ ...elements ];
	for (;;) {
		const currentElement = remainingElements.shift();
		if (currentElement === undefined) {
			break;
		}
		const combinationsOfRemainingElements = nChooseK(remainingElements, k - 1);

		const newCombinations = combinationsOfRemainingElements.map((subCombination) => [
			currentElement,
			...subCombination,
		]);
		result = result.concat(newCombinations);
	}

	return result;
};

describe('nChooseK()', () => {
	xit('returns the combinations with repetition for the given set', () => {
		expect(nChooseK<number>([ 1, 2, 3 ], 2)).toEqual([
			[ 1, 1 ],
			[ 1, 2 ],
			[ 1, 3 ],
			[ 2, 2 ],
			[ 2, 3 ],
			[ 1, 3 ],
			[ 3, 3 ],
		]);
	});

	it('handles n=1', () => {
		expect(nChooseK<number>([ 6 ], 3)).toEqual([ [ 6, 6, 6 ] ]);
	});

	it('handles k=1', () => {
		expect(nChooseK<number>([ 6, 7, 8 ], 1)).toEqual([ [ 6 ], [ 7 ], [ 8 ] ]);
		expect(nChooseK<number>([ 6, 7, 8, 9 ], 1)).toEqual([ [ 6 ], [ 7 ], [ 8 ], [ 9 ] ]);
		expect(nChooseK<number>([ 5, 6, 7, 8, 9 ], 1)).toEqual([ [ 5 ], [ 6 ], [ 7 ], [ 8 ], [ 9 ] ]);
	});
});

export {};
