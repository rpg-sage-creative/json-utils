/** Determines how the JSON is cleaned. */
export type JsonCleanRules = {
    deleteBlankString?: boolean;
    deleteEmptyArray?: boolean;
    deleteEmptyObject?: boolean;
    deleteEmptyString?: boolean;
    deleteFalse?: boolean;
    deleteNaN?: boolean;
    deleteNull?: boolean;
    deleteUndefined?: boolean;
    deleteZero?: boolean;
    recursive?: boolean;
};
/** Cleans the JSON using the minimum rules (delete keys that have "undefined" values). */
export declare function cleanJson<T>(value: T): T;
/** Cleans the JSON using the maximum rules (delete keys that have "falsey" values or are empty arrays or empty objects). */
export declare function cleanJson<T>(value: T, rules: "scrub"): T;
/** Cleans the JSON using the given rules. */
export declare function cleanJson<T>(value: T, rules: JsonCleanRules): T;
