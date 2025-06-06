import fs from "node:fs";
import { join } from "node:path";

export interface ReadDirOptions {
    /** Return nested files inside of the directory. */
    recursive?: boolean;
}

/** Get an array of file paths inside of a folder.
 * @param path The path to the folder.
 * @param options An optional object to configure the behavior of the function. */
export function readDir(path: string, options?: ReadDirOptions): string[] {
    const _options = { recursive: true, ...options };

    // Check if the file path exists first
    if (!fs.existsSync(path)) return [];

    if (!_options.recursive) return fs.readdirSync(path);

    const walk = (_dir: string, _dn?: string): string[] => {
        let results: string[] = [];

        let directory = fs.readdirSync(_dir);

        let file_stats = directory.map(fn => fs.statSync(join(_dir, fn)));
        let files = directory.filter((fn, idx) => file_stats[idx].isFile());
        let dirs = directory.filter((fn, idx) => file_stats[idx].isDirectory());

        for (let fn of files) {
            results.push(_dn ? join(_dn, fn) : fn);
        }
        for (let dn of dirs) {
            results.push(...walk(join(_dir, dn), _dn ? join(_dn, dn) : dn));
        }

        return results;
    };

    return walk(path);
}
