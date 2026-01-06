import { type Options } from "./toLiteral.js";
/**
 * A template function that calls toLiteral on every value passed into the template.
 * Example: tagLiterals`madeUpFn(${firstArg}, ${secondArg})` is the same as `madeUpFn(${toLiteral(firstArg)}, ${toLiteral(secondArg)})`.
 */
export declare function tagLiterals(arg: TemplateStringsArray, ...args: unknown[]): string;
/**
 * Generates a tagLiterals template function that uses the given Options when calling toLiteral().
 * Example: tagLiterals({ellipses:["obj.child"]})`madeUpFn(${firstArg}, ${secondArg})` is the same as `madeUpFn(${toLiteral(firstArg, {ellipses:["obj.child"]})}, ${toLiteral(secondArg, {ellipses:["obj.child"]})})`.
 */
export declare function tagLiterals(arg: Options): (arg: TemplateStringsArray, ...args: unknown[]) => string;
