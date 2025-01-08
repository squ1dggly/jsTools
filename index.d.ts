/* - - - - - { Types } - - - - - */
type AnyListener = (...args: any[]) => any;
type ForcedArray<T> = T extends any[] ? T : T[];

type BetterMapCallback<T extends any[]> = (
    item: T[number],
    extra: {
        idx: number;
        lastElement: T[number] | undefined;
        newArray: T[number][];
        originalArray: T;
    }
) => any;

type ToMapCallback<T extends any[]> = (
    item: T[number],
    extra: {
        idx: number;
        lastElement: T[number] | undefined;
        newMap: Map<any, any>;
        originalArray: T;
    }
) => { key: any; value: any };

/* - - - - - { Interfaces } - - - - - */
interface ForceArrayOptions {
    /** Return a deep copy of the array using {@link structuredClone}. */
    copy?: boolean;
    /** Remove falsey values from the array. */
    filterFalsey?: boolean;
}

interface ParseTimeOptions {
    /** Return "s" (seconds) or "ms" (milliseconds). */
    type?: "ms" | "s";
    /** Add `Date.now()` to the result. */
    fromNow?: boolean;
}

interface ETAOptions {
    /** The anchor to go off of, a unix timestamp in milliseconds. `Date.now()` is default */
    since?: number | string;
    /** Leaves out "ago" if the result is in the past. */
    ignorePast?: boolean;
    /** Returns `null` if `unix` is before `since`. */
    nullIfPast?: boolean;
    /** The number of decimal places to round the result to. `0` is default. */
    decimalLimit?: number;
}

interface ReadDirOptions {
    /** Return nested files inside of the directory. */
    recursive?: boolean;
}

interface MappedEvent {
    id: string;
    once: boolean;
    listener: AnyListener;
}

interface RemoveEventFilter {
    id?: string;
    index?: number;
}

/* - - - - - { Classes } - - - - - */
declare class EventEmitter {
    events: Map<string, MappedEvent[]>;
    execute(eventName: string, ...args: any[]): void;
    executeAsync(eventName: string, ...args: any[]): Promise<void>;
    executeAsyncChain(eventName: string, ...args: any[]): Promise<void>;
    getEvents(eventName: string): MappedEvent[] | undefined;
    spliceEvents(eventName: string, index: number, count: number): this;
    on(id: string | undefined, eventName: string, listener: AnyListener, replace?: boolean): this;
    once(id: string | undefined, eventName: string, listener: AnyListener, replace?: boolean): this;
    off(eventName: string, filter?: RemoveEventFilter): this;
    offAll(eventName: string): this;
    emit(eventName: string, ...args: any[]): boolean;
    emitAsync(eventName: string, ...args: any[]): Promise<boolean>;
    emitAsyncChain(eventName: string, ...args: any[]): Promise<boolean>;
}

/* - - - - - { Functions } - - - - - */
/** Split an array into groups that don't exceed the given size.
 * @param {array} arr The array to split.
 * @param {number} size The max size before splitting.
 * @param {boolean} copy Return a deep copy of the array using {@link structuredClone}. */
declare function chunk<T extends any[]>(arr: T, size: number, copy: boolean = false): T[];

/** Filter out duplicate items or items that contain the same nested property value in the given array.
 *
 * If a property path isn't provided, items will be sorted by direct comparison.
 *
 * Property paths utilize {@link __object.getProp getProp} which allows for advanced property paths.
 *
 * @example
 * ```ts
 * const arr = [
 *     { user: [{ id: 1 }, { id: 2 }] },
 *     { user: [{ id: 3 }, { id: 2 }] }
 * ];
 *
 * // Filters out items that contain the same 'id' value for the 2nd item of the 'user' array
 * console.log(unique(arr, "user[1].id"));
 *
 * // output: [{user: [{id: 1}, {id: 2}]}, {user: [{id: 3}]}]
 * ```
 * @param arr The array of items to filter.
 * @param prop The nested property within each item to filter by.
 * @param copy Return a deep copy of the array using {@link structuredClone}. */
declare function unique<T extends any[]>(arr: T, prop?: string, copy: boolean = false): T;

/** Convert the given item into an array if it is not already.
 * @param item The item to be converted into an array.
 * @param options Optional settings for the conversion. */
declare function forceArray<T>(item: T, options?: ForceArrayOptions): ForcedArray<T>;

/** Similar to {@link Array.prototype.map}, but gives the callback access to the new array being constructed.
 * @param arr The array to map over.
 * @param callback The callback to run on each item in the array.
 * @param copy Return a deep copy of the array using {@link structuredClone}. */
declare function betterMap<T extends any[]>(arr: T, callback: BetterMapCallback<T>, copy = false): T;

/** Similar to {@link Array.prototype.map}, but instead returns a {@link Map}.
 *
 * The callback is given access to the new map being constructed.
 * @param arr The array to map.
 * @param callback The callback to run on each item in the array.
 * @param copy Return a deep copy of the map's values using {@link structuredClone}. */
declare function toMap<T extends any[]>(arr: T, callback: ToMapCallback<T>, copy = false): Map<any, any>;
