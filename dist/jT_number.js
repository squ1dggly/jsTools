"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = sum;
exports.clamp = clamp;
exports.percent = percent;
exports.secToMs = secToMs;
exports.msToSec = msToSec;
exports.formatThousands = formatThousands;
exports.formatLargeNumber = formatLargeNumber;
exports.toOrdinal = toOrdinal;
const jT_object_1 = __importDefault(require("./jT_object"));
/** Get the sum of an array of numbers. Any negative numbers will subtract from the total.
 * @param arr The array to sum.
 * @param path The path to a nested array property.
 * @param ignoreNaN Ignore non-numerical values and use 0 instead. */
function sum(arr, path = "", ignoreNaN = false) {
    const _path = path.trim();
    // Map the array if a path is provided
    const _arr = _path ? arr.map(a => Number(jT_object_1.default.getProp(a, _path))) : arr;
    return _arr.reduce((a, b) => {
        const invalid = isNaN(b) && !ignoreNaN;
        if (invalid)
            throw new TypeError(`\'${b}\' is not a valid number`);
        if (invalid && ignoreNaN)
            b = 0;
        return b < 0 ? a - -b : a + (b || 0);
    }, 0);
}
function clamp(num, range) {
    let _range = { min: 0, max: 0 };
    if (typeof range === "number")
        _range.max = range;
    else
        _range = { min: range.min || 0, max: range.max };
    return num < _range.min ? _range.min : num > _range.max ? _range.max : num;
}
/** Get the percentage value between two numbers.
 * @param a The numerator.
 * @param b The denominator.
 * @param round Whether to round the result to the nearest integer.
 *
 * @example
 * percent(50, 100) --> 50 // 50%
 * percent(30, 40) --> 75 // 75% */
function percent(a, b, round = true) {
    return round ? Math.floor((a / b) * 100) : (a / b) * 100;
}
/** Converts seconds to milliseconds.
 * @param sec The number of seconds to convert.
 * @param round Whether to round the result to the nearest integer. */
function secToMs(sec, round = true) {
    return round ? Math.floor(sec * 1000) : sec * 1000;
}
/** Convert milliseconds to seconds.
 * @param ms The number of milliseconds to convert.
 * @param round Whether to round the result to the nearest integer. */
function msToSec(ms, round = true) {
    return round ? Math.floor(ms / 1000) : ms / 1000;
}
/** Format a number adding a decimal point to each thousand's place.
 * @param num The number to format.
 * @param sep The decimal point to use.
 *
 * @example
 * formatThousands(1000) --> "1,000"
 * formatThousands(1000, ".") --> "1.000" */
function formatThousands(num, sep = ",") {
    return `${num}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, sep);
}
/** Format a number into a short, human-readable string.
 * @param num The number to format.
 * @param units Custom unit names to use.
 *
 * @example
 * formatNumber(1000) -> "1k"
 * formatNumber(1000000) -> "1mil"
 * formatNumber(1000000000) -> "1bil"
 * formatNumber(1000, [" thou", " mill", " bill"]) -> "1 thou" */
function formatLargeNumber(num, units = ["k", "mil", "bil"]) {
    const _units = ["", ...units];
    let index = 0;
    while (Math.abs(num) >= 1000 && index < _units.length - 1) {
        num /= 1000;
        index++;
    }
    let result = num.toFixed(1).replace(/\.0$/, "");
    if (result.slice(-1) === "0")
        result = result.slice(0, -1);
    return result + _units[index];
}
/** Add the ordinal place to the end of a given number.
 * @param num The number to add the ordinal to.
 *
 * @example
 * ordinal(1) -> "1st"
 * ordinal(2) -> "2nd"
 * ordinal(3) -> "3rd"
 * ordinal(4) -> "4th" */
function toOrdinal(num) {
    const endings = ["th", "st", "nd", "rd"];
    const mod = num % 100;
    return `${num}${endings[(mod - 20) % 10] || endings[mod] || endings[0]}`;
}
exports.default = { sum, clamp, percent, secToMs, msToSec, formatThousands, formatLargeNumber, toOrdinal };
