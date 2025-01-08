"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
    events = new Map();
    execute(eventName, ...args) {
        const events = this.events.get(eventName);
        if (!events || !events.length)
            return;
        for (const event of events) {
            if (event.once)
                this.off(eventName, { id: event.id });
            event.listener(...args);
        }
    }
    async executeAsync(eventName, ...args) {
        const events = this.events.get(eventName);
        if (!events || !events.length)
            return;
        await Promise.all(events.map(async (event) => {
            if (event.once)
                this.off(eventName, { id: event.id });
            return event.listener(...args);
        }));
    }
    async executeAsyncChain(eventName, ...args) {
        const events = this.events.get(eventName);
        if (!events || !events.length)
            return;
        for (const event of events) {
            if (event.once)
                this.off(eventName, { id: event.id });
            await event.listener(...args);
        }
    }
    getEvents(eventName) {
        return this.events.get(eventName);
    }
    spliceEvents(eventName, index, count) {
        const events = this.events.get(eventName);
        if (!events || !events.length)
            return this;
        events.splice(index, count);
        this.events.set(eventName, events);
        return this;
    }
    on(id, eventName, listener, replace) {
        const listeners = this.events.get(eventName) || [];
        const newListener = { id: id ?? Date.now().toString(), once: false, listener };
        if (replace && listeners.find(l => l.id === id)) {
            listeners.splice(listeners.findIndex(l => l.id === id), 1, newListener);
        }
        else {
            listeners.push(newListener);
        }
        this.events.set(eventName, listeners);
        return this;
    }
    once(id, eventName, listener, replace) {
        const listeners = this.events.get(eventName) || [];
        const newListener = { id: id ?? Date.now().toString(), once: false, listener };
        if (replace && listeners.some(l => l.id === id)) {
            listeners.splice(listeners.findIndex(l => l.id === id), 1, newListener);
        }
        else {
            listeners.push(newListener);
        }
        this.events.set(eventName, listeners);
        return this;
    }
    off(eventName, filter) {
        if (!this.events.has(eventName))
            return this;
        let listeners = this.events.get(eventName);
        if (filter?.id) {
            listeners = listeners.filter(l => l.id !== filter.id);
        }
        else if (filter?.index) {
            listeners = listeners.filter((_, i) => i !== filter.index);
        }
        else {
            listeners.pop();
        }
        this.events.set(eventName, listeners);
        return this;
    }
    offAll(eventName) {
        if (!this.events.has(eventName))
            return this;
        this.events.delete(eventName);
        return this;
    }
    emit(eventName, ...args) {
        if (!this.events.has(eventName))
            return false;
        this.execute(eventName, ...args);
        return true;
    }
    async emitAsync(eventName, ...args) {
        if (!this.events.has(eventName))
            return false;
        await this.executeAsync(eventName, ...args);
        return true;
    }
    async emitAsyncChain(eventName, ...args) {
        if (!this.events.has(eventName))
            return false;
        await this.executeAsyncChain(eventName, ...args);
        return true;
    }
}
exports.EventEmitter = EventEmitter;
