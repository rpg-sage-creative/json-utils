import { isDate } from "util/types";
export function toLiteral(value, options, keyPath = []) {
    if (value === null)
        return "null";
    if (value === undefined)
        return "undefined";
    if (value) {
        if (Array.isArray(value)) {
            if (options?.ellipses?.includes(keyPath.join("."))) {
                return `[...]`;
            }
            return `[${value.map((value, i) => toLiteral(value, options, keyPath.concat([`${i}`]))).join(",")}]`;
        }
        if (isDate(value)) {
            return `Date("${value.toISOString()}")`;
        }
        if (value instanceof Map) {
            if (options?.ellipses?.includes(keyPath.join("."))) {
                return `Map([...])`;
            }
            return `Map(${toLiteral([...value.entries()])})`;
        }
        if (value instanceof RegExp) {
            return `/${value.source}/${value.flags}`;
        }
        if (value instanceof Set) {
            if (options?.ellipses?.includes(keyPath.join("."))) {
                return `Set([...])`;
            }
            return `Set(${toLiteral([...value.values()])})`;
        }
    }
    switch (typeof (value)) {
        case "bigint":
            return `${value}n`;
        case "object":
            if (options?.ellipses?.includes(keyPath.join("."))) {
                return `{...}`;
            }
            const entries = [...Object.entries(value)];
            const mapped = entries.map(([key, val]) => `${toLiteral(key)}:${toLiteral(val, options, keyPath.concat([key]))}`);
            return `{${mapped.join(",")}}`;
        case "string":
            return JSON.stringify(value);
        default:
            return String(value);
    }
}
