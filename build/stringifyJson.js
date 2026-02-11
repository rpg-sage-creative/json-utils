import { isDate } from "node:util/types";
export const WhitespaceRegExpG = /\s+/g;
function cleanWhitespaceIfShort(value, maxLineLength) {
    return value.length > maxLineLength ? value : value.replaceAll(WhitespaceRegExpG, " ").trim();
}
const CurlyBracesRegExpG = /\{[^{[]*?\}/g;
function inlineCurlyBraces(value, maxLineLength) {
    return value.replace(CurlyBracesRegExpG, match => cleanWhitespaceIfShort(match, maxLineLength));
}
const SquareBracketsRegExpG = /\[((,\s*)?)("[^"]*"|[\w",\s-.])*?\]/g;
function inlineSquareBrackets(value, maxLineLength) {
    return value.replace(SquareBracketsRegExpG, match => cleanWhitespaceIfShort(match, maxLineLength));
}
export function stringifyJson(value, replacer, space, maxLineLength = 0) {
    if (maxLineLength > 0 && !space)
        space = "\t";
    const stringified = JSON.stringify(value, function (key, value) {
        const cleanValue = this[key];
        if (isDate(cleanValue))
            return { $date: cleanValue.toISOString() };
        if (typeof (cleanValue) === "bigint")
            return { $bigint: cleanValue.toString() };
        if (replacer) {
            if (typeof (replacer) === "function") {
                return replacer.call(this, key, value);
            }
            else if (Array.isArray(replacer) && !replacer.some(_key => String(_key) === key)) {
                return undefined;
            }
        }
        return value;
    }, space);
    if (maxLineLength > 0) {
        return inlineCurlyBraces(inlineSquareBrackets(stringified, maxLineLength), maxLineLength);
    }
    return stringified;
}
