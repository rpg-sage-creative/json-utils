export function parseJson(text, reviver) {
    return JSON.parse(text, function (key, value) {
        if (value && Object.keys(value).length === 1) {
            if (typeof (value?.$bigint) === "string") {
                value = BigInt(value.$bigint);
            }
            if (typeof (value?.$date) === "string") {
                value = new Date(value.$date);
            }
        }
        if (reviver)
            return reviver.call(this, key, value);
        return value;
    });
}
export const parse = parseJson;
