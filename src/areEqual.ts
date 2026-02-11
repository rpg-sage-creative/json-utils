import { isPrimitive } from "@rsc-utils/type-utils";
import { stringifyJson } from "./stringifyJson.js";

type Options = {
	strict?: boolean;
};

/**
 * Compares two objects by stringifying them and their contents.
 * Key order is only important if the "strict" option is given.
 */
export function areEqual<T>(a: T, b: T, options?: Options): boolean {
	// unmutateed clones and primitives are validated here
	if (stringifyJson(a) === stringifyJson(b)) return true;

	// strict comparison requires the keys to be in the same order
	if (options?.strict) return false;

	// if we have a primitive on one side, let's end the deep dive
	if (isPrimitive(a) || isPrimitive(b)) return false;

	// get and sort both sets of keys
	const aKeys = Object.keys(a as object).sort() as (keyof T)[];
	const bKeys = Object.keys(b as object).sort();

	// ensure we have the same key count in each
	if (aKeys.length !== bKeys.length) return false;

	// match key and value at each key index
	return aKeys.every((key, index) => key === bKeys[index] && areEqual(a[key], b[key]));
}