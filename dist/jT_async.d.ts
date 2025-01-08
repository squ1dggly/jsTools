/** A wrapper of {@link setTimeout}. */
export declare function sleep(ms: string | number): Promise<void>;
export declare class LoopInterval<T extends (...args: any) => any> {
    #private;
    /** Run a callback function every interval. This will wait for async callbacks to complete before running it back.
     * @param callback The callback that will be ran at each interval.
     * @param delay The time to wait before running the callback again.
     * @param callImediately Whether to run the callback immediately after initialization.
     *
     * This parameter utilizes {@link __date.parseTime jsTools.parseTime}, letting you use "10s" or "1m 30s" instead of a number. */
    constructor(callback: T, delay: string | number, callImediately?: boolean);
    /** Stop the loop. */
    stop(): void;
    /** Set the function to call each time the callback completes.
     * @param callback The function to call when the loop finishes. */
    on(callback: (arg: Awaited<ReturnType<T>>) => any): void;
}
declare const _default: {
    sleep: typeof sleep;
    LoopInterval: typeof LoopInterval;
};
export default _default;
//# sourceMappingURL=jT_async.d.ts.map