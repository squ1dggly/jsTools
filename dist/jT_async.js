"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopInterval = void 0;
exports.sleep = sleep;
const promises_1 = require("node:timers/promises");
const jT_date_1 = __importDefault(require("./jT_date"));
/** A wrapper of {@link setTimeout}. */
async function sleep(ms) {
    return await (0, promises_1.setTimeout)(jT_date_1.default.parseTime(ms));
}
class LoopInterval {
    #onCallback;
    #loop;
    /** Run a callback function every interval. This will wait for async callbacks to complete before running it back.
     * @param callback The callback that will be ran at each interval.
     * @param delay The time to wait before running the callback again.
     * @param callImediately Whether to run the callback immediately after initialization.
     *
     * This parameter utilizes {@link __date.parseTime jsTools.parseTime}, letting you use "10s" or "1m 30s" instead of a number. */
    constructor(callback, delay, callImediately = true) {
        this.#onCallback = () => { };
        this.#loop = true;
        const runItBack = async () => {
            // Execute the callback and get the return value
            const returnValue = await callback();
            // Execute the listener
            this.#onCallback(returnValue);
            if (this.#loop) {
                await sleep(jT_date_1.default.parseTime(delay));
                runItBack();
            }
        };
        if (callImediately) {
            runItBack();
        }
        else {
            sleep(jT_date_1.default.parseTime(delay)).then(() => runItBack());
        }
    }
    /** Stop the loop. */
    stop() {
        this.#loop = false;
    }
    /** Set the function to call each time the callback completes.
     * @param callback The function to call when the loop finishes. */
    on(callback) {
        this.#onCallback = callback;
    }
}
exports.LoopInterval = LoopInterval;
exports.default = { sleep, LoopInterval };
//# sourceMappingURL=jT_async.js.map