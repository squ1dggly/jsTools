"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDir = readDir;
const fs_1 = __importDefault(require("fs"));
/** Get an array of file paths inside of a folder.
 * @param path The path to the folder.
 * @param options An optional object to configure the behavior of the function. */
function readDir(path, options) {
    const _options = { recursive: true, ...options };
    // Check if the file path exists first
    if (!fs_1.default.existsSync(path))
        return [];
    if (!_options.recursive)
        return fs_1.default.readdirSync(path);
    const walk = (_dir, _dn) => {
        let results = [];
        let directory = fs_1.default.readdirSync(_dir);
        let file_stats = directory.map(fn => fs_1.default.statSync(`${_dir}/${fn}`));
        let files = directory.filter((fn, idx) => file_stats[idx].isFile());
        let dirs = directory.filter((fn, idx) => file_stats[idx].isDirectory());
        for (let fn of files)
            results.push(`${_dn ? `${_dn}/` : ""}${fn}`);
        for (let dn of dirs)
            results.push(...walk(`${_dir}/${dn}`, dn));
        return results;
    };
    return walk(path);
}
exports.default = { readDir };
//# sourceMappingURL=jT_file.js.map