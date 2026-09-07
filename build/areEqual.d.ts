type KeyOf<T> = keyof T & string;
type Options<T> = {
    /** keys (and keyPaths) to ignore when comparing; ex: updatedTs */
    ignore?: KeyOf<T>[];
    /** require the order of the keys to be the same */
    strict?: boolean;
};
/**
 * Compares two objects by stringifying them and their contents.
 * Key order is only important if the "strict" option is given.
 */
export declare function areEqual<T>(a: T, b: T, options?: Options<T>): boolean;
export {};
