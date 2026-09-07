export function navigateJson(object, path) {
    const inObject = (key) => object && key && Object.hasOwn(object, key);
    // store navigated keys
    const navigated = [];
    // create path keys for navigating
    const keys = path.split(".");
    // reusable fn for shifting keys and checking them for successful navigation
    const shiftKey = () => {
        const key = keys.shift();
        if (inObject(key)) {
            navigated.push(key);
            return { key, value: object[key] };
        }
        return { key };
    };
    // reusable fn for creating NavigateResults
    const ret = (key, value) => {
        const _path = navigated.join(".");
        return {
            depth: navigated.length,
            path: _path,
            isFull: _path === path,
            parent: object,
            key,
            value
        };
    };
    // navigate the keys while we have an object containing the next key
    while (keys.length > 1) {
        const { key, value } = shiftKey();
        if (!inObject(key)) {
            return ret(key);
        }
        object = value;
    }
    // get final key/val
    const { key, value } = shiftKey();
    return ret(key, value);
}
