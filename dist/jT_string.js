"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTitleCase = toTitleCase;
exports.toLeet = toLeet;
/** Make the first letter of every alphanumeric word uppercase.
 * @param str The string to format. */
function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
}
/** Format a string to "1337" speak.
 * @param str The string to format. */
function toLeet(str) {
    return str.replace(/a|A/g, "4").replace(/e|E/g, "3").replace(/i|I/g, "1").replace(/o|O/g, "0").replace(/t|T/g, "7");
}
exports.default = { toTitleCase, toLeet };