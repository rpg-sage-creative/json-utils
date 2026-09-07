/** Returns true if the given object has no keys. */
export function isKeyless(object) {
    return Object.keys(object).length === 0;
}
