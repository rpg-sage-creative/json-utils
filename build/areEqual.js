import { isPrimitive } from "@rsc-utils/type-utils";
import { stringifyJson } from "./stringifyJson.js";
/** Gets the keys for the given object and optionally filters them. */
function keySet(object, ignore) {
    const set = new Set();
    const keys = Object.keys(object);
    for (const key of keys) {
        if (!ignore?.includes(key)) {
            set.add(key);
        }
    }
    return set;
}
function filterIgnoreKeyPaths(key, ignore) {
    if (!ignore?.length)
        return undefined;
    const filtered = new Set();
    const prefix = key + ".";
    for (const keyPath of ignore) {
        // we only want keyPaths that match the given key
        if (keyPath.startsWith(prefix)) {
            // remove first key from keyPath
            filtered.add(keyPath.split(".").slice(1).join("."));
        }
    }
    return Array.from(filtered);
}
/**
 * Compares two objects by stringifying them and their contents.
 * Key order is only important if the "strict" option is given.
 */
export function areEqual(a, b, options) {
    // SHOULD strict REQUIRE key:undefined to match key:undefined and not allow a missing key?
    // stringifying removes keys with a value of `undefined`
    // unmutated clones and primitives are validated here
    if (stringifyJson(a) === stringifyJson(b))
        return true;
    // strict comparison requires the keys to be in the same order
    if (options?.strict)
        return false;
    // if we have a primitive on one side, let's end the deep dive
    if (isPrimitive(a) || isPrimitive(b))
        return false;
    // create a union of all keys; allows for missing keys to match `key:undefined`
    const aKeys = keySet(a, options?.ignore);
    const bKeys = keySet(b, options?.ignore);
    const keys = Array.from(aKeys.union(bKeys));
    // match key/value pairs; a missing key is treated as `key:undefined`
    return keys.every(key => areEqual(a[key], b[key], { ignore: filterIgnoreKeyPaths(key, options?.ignore) }));
}
