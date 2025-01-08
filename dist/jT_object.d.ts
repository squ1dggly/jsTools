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
export declare function getProp(obj: {}, path: string): any;
declare const _default: {
    getProp: typeof getProp;
};
export default _default;
//# sourceMappingURL=jT_object.d.ts.map