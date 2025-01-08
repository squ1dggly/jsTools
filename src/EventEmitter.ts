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

export class EventEmitter {
    events: Map<string, MappedEvent[]> = new Map();

    private execute(eventName: string, ...args: any[]): void {
        const events = this.events.get(eventName);
        if (!events || !events.length) return;

        for (const event of events) {
            if (event.once) this.off(eventName, { id: event.id });
            event.listener(...args);
        }
    }

    private async executeAsync(eventName: string, ...args: any[]): Promise<void> {
        const events = this.events.get(eventName);
        if (!events || !events.length) return;

        await Promise.all(
            events.map(async event => {
                if (event.once) this.off(eventName, { id: event.id });
                return event.listener(...args);
            })
        );
    }

    private async executeAsyncChain(eventName: string, ...args: any[]): Promise<void> {
        const events = this.events.get(eventName);
        if (!events || !events.length) return;

        for (const event of events) {
            if (event.once) this.off(eventName, { id: event.id });
            await event.listener(...args);
        }
    }

    getEvents(eventName: string): MappedEvent[] | undefined {
        return this.events.get(eventName);
    }

    spliceEvents(eventName: string, index: number, count: number): this {
        const events = this.events.get(eventName);
        if (!events || !events.length) return this;
        events.splice(index, count);
        this.events.set(eventName, events);
        return this;
    }

    on(id: string | undefined, eventName: string, listener: AnyListener, replace?: boolean): this {
        const listeners: MappedEvent[] = this.events.get(eventName) || [];
        const newListener: MappedEvent = { id: id ?? Date.now().toString(), once: false, listener };

        if (replace && listeners.find(l => l.id === id)) {
            listeners.splice(
                listeners.findIndex(l => l.id === id),
                1,
                newListener
            );
        } else {
            listeners.push(newListener);
        }
        this.events.set(eventName, listeners);

        return this;
    }

    once(id: string | undefined, eventName: string, listener: AnyListener, replace?: boolean): this {
        const listeners: MappedEvent[] = this.events.get(eventName) || [];
        const newListener: MappedEvent = { id: id ?? Date.now().toString(), once: false, listener };
        if (replace && listeners.some(l => l.id === id)) {
            listeners.splice(
                listeners.findIndex(l => l.id === id),
                1,
                newListener
            );
        } else {
            listeners.push(newListener);
        }
        this.events.set(eventName, listeners);
        return this;
    }

    off(eventName: string, filter?: RemoveEventFilter): this {
        if (!this.events.has(eventName)) return this;

        let listeners: MappedEvent[] = this.events.get(eventName)!;

        if (filter?.id) {
            listeners = listeners.filter(l => l.id !== filter.id);
        } else if (filter?.index) {
            listeners = listeners.filter((_, i) => i !== filter.index);
        } else {
            listeners.pop();
        }

        this.events.set(eventName, listeners);
        return this;
    }

    offAll(eventName: string): this {
        if (!this.events.has(eventName)) return this;
        this.events.delete(eventName);
        return this;
    }

    emit(eventName: string, ...args: any[]): boolean {
        if (!this.events.has(eventName)) return false;
        this.execute(eventName, ...args);
        return true;
    }

    async emitAsync(eventName: string, ...args: any[]): Promise<boolean> {
        if (!this.events.has(eventName)) return false;
        await this.executeAsync(eventName, ...args);
        return true;
    }

    async emitAsyncChain(eventName: string, ...args: any[]): Promise<boolean> {
        if (!this.events.has(eventName)) return false;
        await this.executeAsyncChain(eventName, ...args);
        return true;
    }
}
