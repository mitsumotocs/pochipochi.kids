export class ComponentBase extends HTMLElement {
    constructor() {
        super();

        if (new.target === ComponentBase) {
            throw new TypeError('Cannot construct ComponentBase instances directly');
        }

        this.eventListenerMap = new Map();
    }

    bindEventListener(element, type, listener, options = {}) {
        const entry = {
            type: type,
            listener: listener.bind(this),
            options: options,
        };

        if (this.eventListenerMap.has(element)) {
            const entries = this.eventListenerMap.get(element);
            entries.push(entry);

            return this;
        }

        this.eventListenerMap.set(element, [entry]);

        return this;
    }

    enableEventListeners() {
        for (const [element, entries] of this.eventListenerMap) {
            //console.log(element, entries);
            for (const entry of entries) {
                if (entry.type instanceof Array) {
                    for (const type of entry.type) {
                        element.addEventListener(type, entry.listener, entry.options);
                    }

                    continue;
                }

                element.addEventListener(entry.type, entry.listener, entry.options);
            }
        }

        return this;
    }

    disableEventListeners() {
        for (const [element, entries] of this.eventListenerMap) {
            //console.log(element, entries);
            for (const entry of entries) {
                if (entry.type instanceof Array) {
                    for (const type of entry.type) {
                        element.removeEventListener(type, entry.listener);
                    }

                    continue;
                }

                element.removeEventListener(entry.type, entry.listener);
            }
        }

        return this;
    }
}