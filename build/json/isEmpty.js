export function isEmpty(object) {
    const keys = Object.keys(object);
    return !keys.some(key => object[key] !== undefined);
}
