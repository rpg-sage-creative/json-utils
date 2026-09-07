import { parseJson } from "./parseJson.js";
import { stringifyJson } from "./stringifyJson.js";
/** BigInt safe JSON.parse(JSON.stringify(object)) */
export function cloneJson(object) {
    if (object === undefined) {
        throw new SyntaxError(`JSON Parse error: Unexpected identifier "undefined"`);
    }
    return parseJson(stringifyJson(object));
}
