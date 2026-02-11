type Options = {
    strict?: boolean;
};
/**
 * Compares two objects by stringifying them and their contents.
 * Key order is only important if the "strict" option is given.
 */
export declare function areEqual<T>(a: T, b: T, options?: Options): boolean;
export {};
