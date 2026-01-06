import { isPrimitive } from "../types/typeGuards/isPrimitive.js";
import { stringifyJson } from "./stringifyJson.js";
export function areEqual(a, b, options) {
    if (stringifyJson(a) === stringifyJson(b))
        return true;
    if (options?.strict)
        return false;
    if (isPrimitive(a) || isPrimitive(b))
        return false;
    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();
    if (aKeys.length !== bKeys.length)
        return false;
    return aKeys.every((key, index) => key === bKeys[index] && areEqual(a[key], b[key]));
}
