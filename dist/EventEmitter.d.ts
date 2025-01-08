export type AnyListener = (...args: any[]) => any;
export interface MappedEvent {
    id: string;
    once: boolean;
    listener: AnyListener;
}
export interface RemoveEventFilter {
    id?: string;
    index?: number;
}
export declare class EventEmitter {
    events: Map<string, MappedEvent[]>;
    private execute;
    private executeAsync;
    private executeAsyncChain;
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
//# sourceMappingURL=EventEmitter.d.ts.map