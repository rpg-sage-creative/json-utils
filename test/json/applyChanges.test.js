import { applyChanges, stringifyJson } from "../../build/index.js";

const toString = value => stringifyJson(value);

describe("json", () => {
	describe("applyChanges", () => {

		// [input, changes, output, changed]
		const tests = [
			[{}, {}, {}, false],

			[{ zero:0 }, { zero:0n }, { zero:0n }, true],

			[{ a:"Apple" }, { a:"Apple" }, { a:"Apple" }, false],
			[{ a:"Apple" }, { a:"alpha" }, { a:"alpha" }, true],
			[{ a:"Apple" }, { a:null }, { a:undefined }, true],
			[{ a:"Apple" }, { a:undefined }, { a:"Apple" }, false],

			[{ a:"Apple", b:"Banana" }, { a:"alpha", b:undefined }, { a:"alpha", b:"Banana" }, true],
			[{ a:"Apple", b:"Banana" }, { a:"alpha", b:null }, { a:"alpha", b:undefined }, true],
			[{ a:"Apple", b:"Banana" }, { a:"alpha", b:"beta" }, { a:"alpha", b:"beta" }, true],
			[{ a:"Apple", b:"Banana" }, { a:undefined, b:undefined }, { a:"Apple", b:"Banana" }, false],
			[{ a:"Apple", b:"Banana" }, { a:null, b:null }, { a:undefined, b:undefined }, true],
			[{ a:"Apple", b:"Banana" }, { a:null, b:null }, { }, true],
		];

		tests.forEach(([input, changes, output, changed]) => {
			test(`applyChanges(${toString(input)}, ${toString(changes)}) equals ${toString(output)}`, () => {
				const applied = applyChanges(input, changes);
				expect(applied).toBe(changed);
				expect(input).toEqual(output);
			});
		});
	});
});