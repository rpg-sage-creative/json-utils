import { isDate } from "node:util/types";

export const WhitespaceRegExpG = /\s+/g;

const CurlyBracesRegExp = /\{[^{[]*?\}/g;
const SquareBracketsRegExp = /\[((,\s*)?)("[^"]*"|[\w",\s-.])*?\]/g;

/**
 * BigInt and Date friendly replacement for JSON.stringify().
 */
export function stringifyJson(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number, maxLineLength?: number): string;

export function stringifyJson(value: any, replacer?: (string | number)[] | null, space?: string | number, maxLineLength?: number): string;

export function stringifyJson(value: any, replacer?: Function | (string | number)[] | null, space?: string | number, maxLineLength = 0): string {
	// if we have a maxLineLength, we need to make sure we have "space" character(s)
	if (maxLineLength > 0 && !space) space = "\t";

	const stringified = JSON.stringify(value, function(this: any, key: string, value: any) {
		// we are handling bigint and date values
		const cleanValue = this[key];
		if (isDate(cleanValue)) return { $date:cleanValue.toISOString() };
		if (typeof(cleanValue) === "bigint") return { $bigint:cleanValue.toString() };

		// if they passed in a replacer, then let's use it
		if (replacer) {
			// call a function
			if (typeof(replacer) === "function") {
				return replacer.call(this, key, value);

			// check an array to ensure the key was given
			}else if (Array.isArray(replacer) && !replacer.some(_key => String(_key) === key)) {
				return undefined;
			}
		}

		return value;
	}, space);

	// if we have a maxLineLength, process the json
	if (maxLineLength > 0) {
		const cleanWhitespaceIfShort = (value: string, maxLineLength: number) => value.length > maxLineLength ? value : value.replaceAll(WhitespaceRegExpG, " ").trim();
		const inlineCurlyBraces = (value: string, maxLineLength: number) => value.replace(CurlyBracesRegExp, match => cleanWhitespaceIfShort(match, maxLineLength));
		const inlineSquareBrackets = (value: string, maxLineLength: number) => value.replace(SquareBracketsRegExp, match => cleanWhitespaceIfShort(match, maxLineLength));
		return inlineCurlyBraces(inlineSquareBrackets(stringified, maxLineLength), maxLineLength);
	}

	return stringified;
}

/** @deprecated use stringifyJson() */
export const stringify = stringifyJson;
