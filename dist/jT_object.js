"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProp = getProp;
/** Return a nested property from a given object using the provided path.
 *
 * @example
 * ```ts
 * // returns 5
 * let obj = { a: 5 };
 * getProp(obj, "a");
 *
 * // returns "hello, world!"
 * let obj = { a: [{ content: "hello, world!" }] };
 * getProp(obj, "a[0].content");
 * ```
 * @param obj The object.
 * @param path Path to the nested property within the object. */
function getProp(obj, path) {
    let _obj = obj;
    const _path = path
        // Strip whitespace
        .trim()
        // Replace array indexes with property index values
        .replace(/\[(\w+)\]/g, ".$1")
        // Strip leading dots
        .replace(/^\./, "")
        // Split path into an array of property names
        .split(".");
    // Used for debugging where we were at before throwing an error
    const debug_path = [];
    // Iterate through each property path strings
    for (let i = 0; i < _path.length; ++i) {
        // Get the current property path we're at
        const prop = _path[i];
        // DEBUGGING
        debug_path.push(prop);
        try {
            // Check if the property exists
            if (prop in _obj && _obj[prop] === undefined)
                throw new Error(`Object property \'${debug_path.join(".")}\' is undefined`);
            // Set obj to the new value
            _obj = _obj[prop];
        }
        catch {
            throw new Error(`Cannot get property \'${prop}\' from \'${_obj}\'`);
        }
    }
    return _obj;
}
exports.default = { getProp };
//# sourceMappingURL=jT_object.js.map