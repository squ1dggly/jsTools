/** Get the sum of an array of numbers. Any negative numbers will subtract from the total.
 * @param arr The array to sum.
 * @param path The path to a nested array property.
 * @param ignoreNaN Ignore non-numerical values and use 0 instead. */
export declare function sum(arr: number[], path?: string, ignoreNaN?: boolean): number;
/** Clamps a number within a specified range.
 * @param num Number to be clamped.
 * @param range The range to clamp. `min` defaults to 0. */
export declare function clamp(num: number, max: number): number;
export declare function clamp(num: number, range: {
    min?: number;
    max: number;
}): number;
/** Get the percentage value between two numbers.
 * @param a The numerator.
 * @param b The denominator.
 * @param round Whether to round the result to the nearest integer.
 *
 * @example
 * percent(50, 100) --> 50 // 50%
 * percent(30, 40) --> 75 // 75% */
export declare function percent(a: number, b: number, round?: boolean): number;
/** Converts seconds to milliseconds.
 * @param sec The number of seconds to convert.
 * @param round Whether to round the result to the nearest integer. */
export declare function secToMs(sec: number, round?: boolean): number;
/** Convert milliseconds to seconds.
 * @param ms The number of milliseconds to convert.
 * @param round Whether to round the result to the nearest integer. */
export declare function msToSec(ms: number, round?: boolean): number;
/** Format a number adding a decimal point to each thousand's place.
 * @param num The number to format.
 * @param sep The decimal point to use.
 *
 * @example
 * formatThousands(1000) --> "1,000"
 * formatThousands(1000, ".") --> "1.000" */
export declare function formatThousands(num: number, sep?: string): string;
/** Format a number into a short, human-readable string.
 * @param num The number to format.
 * @param units Custom unit names to use.
 *
 * @example
 * formatNumber(1000) -> "1k"
 * formatNumber(1000000) -> "1mil"
 * formatNumber(1000000000) -> "1bil"
 * formatNumber(1000, [" thou", " mill", " bill"]) -> "1 thou" */
export declare function formatLargeNumber(num: number, units?: [string, string, string]): string;
/** Add the ordinal place to the end of a given number.
 * @param num The number to add the ordinal to.
 *
 * @example
 * ordinal(1) -> "1st"
 * ordinal(2) -> "2nd"
 * ordinal(3) -> "3rd"
 * ordinal(4) -> "4th" */
export declare function toOrdinal(num: number): string;
declare const _default: {
    sum: typeof sum;
    clamp: typeof clamp;
    percent: typeof percent;
    secToMs: typeof secToMs;
    msToSec: typeof msToSec;
    formatThousands: typeof formatThousands;
    formatLargeNumber: typeof formatLargeNumber;
    toOrdinal: typeof toOrdinal;
};
export default _default;
//# sourceMappingURL=jT_number.d.ts.map