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
function forceArray(item, options) {
    let itemArray = Array.isArray(item) ? item : [item];
    if (options?.filterFalsey)
        itemArray = itemArray.filter(Boolean);
    if (options?.copy)
        itemArray = structuredClone(itemArray);
    return itemArray;
}
function betterMap(arr, callback, copy = false) {
    const originalArray = arr;
    const newArray = [];
    for (let idx = 0; idx < originalArray.length; idx++) {
        const lastElement = newArray[idx - 1];
        newArray.push(callback(originalArray[idx], { idx, lastElement, newArray, originalArray }));
    }
    return copy ? structuredClone(newArray) : newArray;
}
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
