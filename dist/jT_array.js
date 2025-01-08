"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunk = chunk;
exports.unique = unique;
exports.forceArray = forceArray;
exports.betterMap = betterMap;
exports.toMap = toMap;
const __object = __importStar(require("./jT_object"));
/** Split an array into groups that don't exceed the given size.
 * @param {array} arr The array to split.
 * @param {number} size The max size before splitting.
 * @param {boolean} copy Return a deep copy of the array using {@link structuredClone}. */
function chunk(arr, size, copy = false) {
    if (size <= 0)
        throw new Error("Size cannot be 0 or negative");
    if (!arr.length || arr.length < size)
        return [arr];
    const chunk = [];
    // Iterate through the array
    for (let i = 0; i < arr.length; i += size) {
        // Slice the array from the current index
        chunk.push(arr.slice(i, i + size));
    }
    return copy ? structuredClone(chunk) : chunk;
}
/** Filter out duplicate items or items that contain the same nested property value in the given array.
 *
 * If a property path isn't provided, items will be sorted by direct comparison.
 *
 * Property paths utilize {@link __object.getProp getProp} which allows for advanced property paths.
 *
 * @example
 * ```ts
 * const arr = [
 *     { user: [{ id: 1 }, { id: 2 }] },
 *     { user: [{ id: 3 }, { id: 2 }] }
 * ];
 *
 * // Filters out items that contain the same 'id' value for the 2nd item of the 'user' array
 * console.log(unique(arr, "user[1].id"));
 *
 * // output: [{user: [{id: 1}, {id: 2}]}, {user: [{id: 3}]}]
 * ```
 * @param arr The array of items to filter.
 * @param prop The nested property within each item to filter by.
 * @param copy Return a deep copy of the array using {@link structuredClone}. */
function unique(arr, prop, copy = false) {
    const uniqueArray = [];
    const referenceMap = new Map();
    for (let item of arr) {
        let property = typeof item === "object" && prop ? __object.getProp(item, prop) : item;
        // Check if the reference map already has this property
        if (!referenceMap.has(property)) {
            referenceMap.set(property, property);
            uniqueArray.push(item);
        }
    }
    return (copy ? structuredClone(uniqueArray) : uniqueArray);
}
/** Convert the given item into an array if it is not already.
 * @param item The item to be converted into an array.
 * @param options Optional settings for the conversion. */
function forceArray(item, options) {
    let itemArray = Array.isArray(item) ? item : [item];
    if (options?.filterFalsey)
        itemArray = itemArray.filter(Boolean);
    if (options?.copy)
        itemArray = structuredClone(itemArray);
    return itemArray;
}
/** Similar to {@link Array.prototype.map}, but gives the callback access to the new array being constructed.
 * @param arr The array to map over.
 * @param callback The callback to run on each item in the array.
 * @param copy Return a deep copy of the array using {@link structuredClone}. */
function betterMap(arr, callback, copy = false) {
    const originalArray = arr;
    const newArray = [];
    for (let idx = 0; idx < originalArray.length; idx++) {
        const lastElement = newArray[idx - 1];
        newArray.push(callback(originalArray[idx], { idx, lastElement, newArray, originalArray }));
    }
    return copy ? structuredClone(newArray) : newArray;
}
/** Similar to {@link Array.prototype.map}, but instead returns a {@link Map}.
 *
 * The callback is given access to the new map being constructed.
 * @param arr The array to map.
 * @param callback The callback to run on each item in the array.
 * @param copy Return a deep copy of the map's values using {@link structuredClone}. */
function toMap(arr, callback, copy = false) {
    let arrayOriginal = arr;
    let mapNew = new Map();
    for (let idx = 0; idx < arrayOriginal.length; idx++) {
        const lastElement = mapNew.get(idx - 1);
        const item = callback(arrayOriginal[idx], { idx, lastElement, newMap: mapNew, originalArray: arrayOriginal });
        mapNew.set(item.key, copy ? structuredClone(item.value) : item.value);
    }
    return mapNew;
}
exports.default = { chunk, unique, forceArray, betterMap, toMap };
//# sourceMappingURL=jT_array.js.map