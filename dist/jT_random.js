"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumber = randomNumber;
exports.numberString = numberString;
exports.alphaString = alphaString;
exports.alphaNumbericString = alphaNumbericString;
exports.chance = chance;
exports.choice = choice;
exports.choiceIndex = choiceIndex;
exports.choiceWeighted = choiceWeighted;
const jT_object_1 = __importDefault(require("./jT_object"));
const jT_array_1 = __importDefault(require("./jT_array"));
// prettier-ignore
const alphabet = [
    "a", "b", "c", "d",
    "e", "f", "g", "h",
    "i", "j", "k", "l",
    "m", "n", "o", "p",
    "q", "r", "s", "t",
    "u", "v", "w", "x",
    "y", "z"
];
/** Choose a psuedo-random number within a min-max range.
 * @param minimum Minimum value.
 * @param maximum Maximum value.
 * @param round Round up the sum. */
function randomNumber(min, max, round = true) {
    let sum = min + (max - min) * Math.random();
    return round ? Math.round(sum) : sum;
}
/** Create a psuedo-random string of numbers [0-9] for the given length.
 * @param len The length of the string. */
function numberString(len) {
    let str = "";
    for (let i = 0; i < len; i++)
        str += randomNumber(0, 9);
    return str;
}
/** Create a psuedo-random string of letters [a-zA-Z] for the given length.
 * @param len The length of the string.
 * @param includeUpper Include uppercase letters in the string. Default is `false`. */
function alphaString(len, includeUpper = false) {
    let str = "";
    for (let i = 0; i < len; i++)
        str += includeUpper && chance() ? choice(alphabet).toUpperCase() : choice(alphabet);
    return str;
}
/** Create a pseudo-random alphanumeric string [a-zA-Z0-9] of the specified length.
 * @param len The length of the string.
 * @param includeUpper Include uppercase letters in the string. Default is `false`. */
function alphaNumbericString(len, includeUpper = false) {
    let str = "";
    for (let i = 0; i < len; i++) {
        const char = (str += chance() ? choice(alphabet) : randomNumber(0, 9));
        str += includeUpper && chance() ? char.toUpperCase() : char;
    }
    return str;
}
/** Create a psuedo-random chance based on the given percentage.
 * @param percent The percentage chance of success. Must be between 1 and 100. Default is 50.*/
function chance(percent = 50) {
    if (percent < 1 || percent > 100)
        throw new Error(`\`${percent}\` must be within a range of 1 and 100`);
    return randomNumber(0, 100) < percent;
}
/** Choose a psuedo-random item from an array.
 * @param arr Array of items to choose from.
 * @param copy Return a deep copy of the array using {@link structuredClone}. */
function choice(arr, copy = false) {
    let item = arr[randomNumber(0, arr.length - 1)];
    return copy ? structuredClone(item) : item;
}
/** Return a psuedo-random index from the given array.
 * @param arr The array to generate an index for. */
function choiceIndex(arr) {
    return randomNumber(0, arr.length - 1);
}
/** Choose a psuedo-random item from an array by weighted rarity.
 * @param arr The array of items to choose from.
 * @param path The nested property path to calculate weights. By default, the item at the current index is used.
 * @param copy Whether to return a copy of the chosen item. Default is `false`. */
function choiceWeighted(arr, path = "", copy = false) {
    // Calculate the weight of each element in the array
    let weights = jT_array_1.default.betterMap(arr, (item, { lastElement }) => {
        const prop = path ? jT_object_1.default.getProp(item, path) : item;
        if (typeof prop !== "number")
            throw new TypeError(`\`${path}\` must lead to a number property in the array`);
        return prop + (lastElement || 0);
    });
    // Generates a random float and multiplies it by the largest sum in the array of weights
    const decider = Math.random() * weights[weights.length - 1];
    // Returns the first item in the original array that has a rarity higher than or equal to decider
    /* NOTE: how this picks a random item from that rarity I still have no idea but at least it's less work for me, lol */
    const item = arr[weights.findIndex(w => w >= decider)];
    return copy ? structuredClone(item) : item;
}
exports.default = { randomNumber, numberString, alphaString, alphaNumbericString, chance, choice, choiceIndex, choiceWeighted };
//# sourceMappingURL=jT_random.js.map