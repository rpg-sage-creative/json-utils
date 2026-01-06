type Primitive = Date | "bigint" | "boolean" | "number" | "string";
/** Checks to see if the object given is a primitive type: null, undefined, Date, bigint, number, string, boolean. */
export declare function isPrimitive(object: unknown): object is Primitive | null | undefined;
export {};
/**
 * @todo take a long look at why i consider Date a primitive
 * ... i think because it stringifies to a number and new Date(number|date) gets a date.
 * */ 
