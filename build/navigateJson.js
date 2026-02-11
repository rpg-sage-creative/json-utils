export function navigateJson(object, path) {
    const inObject = (key) => object && key && Object.hasOwn(object, key);
    const navigated = [];
    const keys = path.split(".");
    const shiftKey = () => {
        const key = keys.shift();
        if (inObject(key)) {
            navigated.push(key);
            return { key, value: object[key] };
        }
        return { key };
    };
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
    while (keys.length > 1) {
        const { key, value } = shiftKey();
        if (!inObject(key)) {
            return ret(key);
        }
        object = value;
    }
    const { key, value } = shiftKey();
    return ret(key, value);
}
