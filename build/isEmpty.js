/** Returns true if the object is keyless or all keys have a value of undefined. */
export function isEmpty(object) {
    const keys = Object.keys(object);
    return !keys.some(key => object[key] !== undefined);
}
