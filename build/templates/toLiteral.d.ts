export type Options = {
    /** key paths to match for displaying "..." instead of content */
    ellipses?: string[];
};
/**
 * Returns the given value as it would look in code.
 * This function is designed to facilitate displaying values in test output.
 *
 * Strings have quotes around them.
 * RegExp looks like /value/i.
 * BigInts have an "n": 123n.
 * Objects/Arrays are stringified.
 * Null is null.
 * Undefined is undefined.
 */
export declare function toLiteral(value: unknown, options?: Options): string;
