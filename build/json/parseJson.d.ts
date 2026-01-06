/**
 * BigInt and Date friendly replacement for JSON.parse().
 */
export declare function parseJson<T = any>(text: string, reviver?: (this: any, key: string, value: any) => any): T;
/** @deprecated use parseJson() */
export declare const parse: typeof parseJson;
