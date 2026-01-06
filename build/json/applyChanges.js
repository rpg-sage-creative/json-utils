export function applyChanges(base, changed, unsetValue) {
    let hasChanges = false;
    if (base && changed) {
        const keys = Object.keys(changed);
        for (const key of keys) {
            const newValue = changed[key];
            if (newValue !== undefined) {
                const oldValue = base[key];
                if (newValue === null) {
                    base[key] = unsetValue;
                }
                else {
                    base[key] = newValue;
                }
                hasChanges = hasChanges || oldValue !== base[key];
            }
        }
    }
    return hasChanges;
}
