import { isPrimitive } from "@rsc-utils/type-utils";
//#endregion
//#region helpers
/** Checks the rules to see if the value given can have its key deleted. */
function canDeleteValueKey(value, rules) {
    const testKey = (key) => rules === true || rules[key] === true;
    if (value === undefined) {
        return testKey("deleteUndefined");
    }
    else if (value === null) {
        return testKey("deleteNull");
    }
    else if (value === false) {
        return testKey("deleteFalse");
    }
    else if (value === 0 || value === 0n) {
        return testKey("deleteZero");
    }
    else if (typeof (value) === "number" && isNaN(value)) {
        return testKey("deleteNaN");
    }
    else if (typeof (value) === "string") {
        if (value === "" && testKey("deleteEmptyString"))
            return true;
        if (value.trim() === "" && testKey("deleteBlankString"))
            return true;
    }
    return false;
}
export function cleanJson(value, rulesOrScrub) {
    // We don't clean primitive values
    if (isPrimitive(value)) {
        return value;
    }
    const rules = rulesOrScrub === "scrub" ? true : rulesOrScrub ?? { deleteUndefined: true };
    // If it is an array, we only clean it if the rules include recursion
    if (Array.isArray(value)) {
        if (value.length && (rules === true || rules.recursive)) {
            value.forEach(v => cleanJson(v, rulesOrScrub));
        }
        return value;
    }
    cleanObject(value, rules);
    return value;
}
/** This is where the magic happens. */
function cleanObject(object, rules) {
    const keys = Object.keys(object);
    for (const key of keys) {
        const value = object[key];
        if (canDeleteValueKey(value, rules)) {
            delete object[key];
        }
        else if (Array.isArray(value)) {
            if (value.length) {
                if (rules === true || rules.recursive) {
                    value.forEach(v => cleanJson(v, rules));
                }
            }
            else if (rules === true || rules.deleteEmptyArray) {
                delete object[key];
            }
        }
        else if (String(value) === "[object Object]") {
            if (rules === true || rules.recursive) {
                cleanJson(value, rules);
            }
            // We have cleaned the object, check to see if it is now empty
            if ((rules === true || rules.deleteEmptyObject) && Object.keys(value).length === 0) {
                delete object[key];
            }
        }
    }
}
