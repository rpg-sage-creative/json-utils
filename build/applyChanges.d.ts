/** Make all properties in T type Optional */
type Args<T> = {
    [P in keyof T]?: T[P] | null | undefined;
};
/**
 * Finds all keys of {changes} with values that are !undefined;
 * These values are then applied to {base}.
 * base.key is set to undefined when changes.key is null unless {unsetValue} is null.
 * Returns true if any changes were made.
*/
export declare function applyChanges<T>(base: T, changed: Args<T>, unsetValue?: null): boolean;
export {};
