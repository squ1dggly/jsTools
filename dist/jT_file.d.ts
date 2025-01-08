export interface ReadDirOptions {
    /** Return nested files inside of the directory. */
    recursive?: boolean;
}
/** Get an array of file paths inside of a folder.
 * @param path The path to the folder.
 * @param options An optional object to configure the behavior of the function. */
export declare function readDir(path: string, options?: ReadDirOptions): string[];
declare const _default: {
    readDir: typeof readDir;
};
export default _default;
//# sourceMappingURL=jT_file.d.ts.map