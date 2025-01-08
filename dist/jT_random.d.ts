/** Choose a psuedo-random number within a min-max range.
 * @param minimum Minimum value.
 * @param maximum Maximum value.
 * @param round Round up the sum. */
export declare function randomNumber(min: number, max: number, round?: boolean): number;
/** Create a psuedo-random string of numbers [0-9] for the given length.
 * @param len The length of the string. */
export declare function numberString(len: number): string;
/** Create a psuedo-random string of letters [a-zA-Z] for the given length.
 * @param len The length of the string.
 * @param includeUpper Include uppercase letters in the string. Default is `false`. */
export declare function alphaString(len: number, includeUpper?: boolean): string;
/** Create a pseudo-random alphanumeric string [a-zA-Z0-9] of the specified length.
 * @param len The length of the string.
 * @param includeUpper Include uppercase letters in the string. Default is `false`. */
export declare function alphaNumbericString(len: number, includeUpper?: boolean): string;
/** Create a psuedo-random chance based on the given percentage.
 * @param percent The percentage chance of success. Must be between 1 and 100. Default is 50.*/
export declare function chance(percent?: number): boolean;
/** Choose a psuedo-random item from an array.
 * @param arr Array of items to choose from.
 * @param copy Return a deep copy of the array using {@link structuredClone}. */
export declare function choice<T>(arr: T[], copy?: boolean): T;
/** Return a psuedo-random index from the given array.
 * @param arr The array to generate an index for. */
export declare function choiceIndex(arr: any[]): number;
/** Choose a psuedo-random item from an array by weighted rarity.
 * @param arr The array of items to choose from.
 * @param path The nested property path to calculate weights. By default, the item at the current index is used.
 * @param copy Whether to return a copy of the chosen item. Default is `false`. */
export declare function choiceWeighted<T extends any[]>(arr: T, path?: string, copy?: boolean): T[number];
declare const _default: {
    randomNumber: typeof randomNumber;
    numberString: typeof numberString;
    alphaString: typeof alphaString;
    alphaNumbericString: typeof alphaNumbericString;
    chance: typeof chance;
    choice: typeof choice;
    choiceIndex: typeof choiceIndex;
    choiceWeighted: typeof choiceWeighted;
};
export default _default;
//# sourceMappingURL=jT_random.d.ts.map