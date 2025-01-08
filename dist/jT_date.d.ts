export interface ParseTimeOptions {
    /** Return "s" (seconds) or "ms" (milliseconds). */
    type?: "ms" | "s";
    /** Add `Date.now()` to the result. */
    fromNow?: boolean;
}
export interface ETAOptions {
    /** The anchor to go off of, a unix timestamp in milliseconds. `Date.now()` is default */
    since?: number | string;
    /** Leaves out "ago" if the result is in the past. */
    ignorePast?: boolean;
    /** Returns `null` if `unix` is before `since`. */
    nullIfPast?: boolean;
    /** The number of decimal places to round the result to. `0` is default. */
    decimalLimit?: number;
}
/** Parse a string into either milliseconds or seconds.
 * @param str The string to parse.
 * @param options An optional object to configure the behavior of the function.
 *
 * @example
 * parse("1m") --> 60000
 * parse("1h 30m") --> 5400000
 *
 * parse("1h", { fromNow: true }) --> Date.now() + 3600000
 * parse("-1m", { type: "s" }) --> -60 */
export declare function parseTime(str: string | number, options?: ParseTimeOptions): number;
/** Parses the time difference between a given Unix timestamp and a reference point into a human-readable string.
 * @param unix The Unix timestamp in milliseconds for which the time difference is calculated.
 * @param options An optional object to configure the behavior of the function.
 *
 * @example
 * eta(1703001733955) --> "1 hour" (from now)
 * eta(1702994533936, { nullIfPast: true }) --> null */
export declare function eta(unix: number | string, options?: ETAOptions): string | null;
/** Parses the time difference between a given Unix timestamp and a reference point into a dynamic "H, M, and S" string format.
 * @param unix The Unix timestamp in milliseconds for which the time difference is calculated.
 * @param options An optional object to configure the behavior of the function.
 *
 * @example
 * etaHMS(1703001733955) // returns "1 hour, 0 minutes, and 0 seconds" (from now)
 * etaHMS(1702994533936, { nullIfPast: true }) // returns null */
export declare function etaHMS(unix: number | string, options?: ETAOptions): string | null;
/** Format a unix timestamp into a dynamic "Y, MTH, D, H, M, and S" time string format.
 * @param unix The Unix timestamp in milliseconds for which the time difference is calculated.
 * @param options An optional object to configure the behavior of the function.
 *
 * @copyright *Code written by **@fujimori_*** */
export declare function etaYMDHMS(unix: number | string, options?: ETAOptions): string | null;
/**Format a Unix timestamp into a dynamic "DD:HH:MM:SS" time string format.
 * @param unix The Unix timestamp in milliseconds to convert.
 * @param options An optional object to configure the behavior of the function.
 * @copyright *Code written by **@fujimori_*** */
export declare function etaDigital(unix: number | string, options?: ETAOptions): string | null;
declare const _default: {
    parseTime: typeof parseTime;
    eta: typeof eta;
    etaHMS: typeof etaHMS;
    etaYMDHMS: typeof etaYMDHMS;
    etaDigital: typeof etaDigital;
};
export default _default;
//# sourceMappingURL=jT_date.d.ts.map