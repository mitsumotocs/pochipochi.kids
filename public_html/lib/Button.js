import { html } from "./functions.js";

export class Button extends HTMLElement {
    static HTML = html`
        <style>
            * {
                box-sizing: border-box;
            }
            :host {
                display: inline-block;
                background-color: #ccc;
                box-shadow: inset 0 -4px 0 0 #999;
                padding: 8px 8px 12px 8px;
                border-radius: 4px;
                font-weight: bold;
                color: blue;
            }
            :host(.pressed) {
                color: red;
            }
        </style>
        <slot>Button</slot>
    `;

    constructor() {
        super();

        this.eventListenerMap = new Map();

        this.root = this.attachShadow({ mode: "open" });
        this.root.innerHTML = Button.HTML;

        window.PPK.buttonsPressed ||= [];

        this
            .bindEventListener(document, "pointerdown", this.press)
            .bindEventListener(document, ["pointerup", "pointercancel"], this.unpress)
            .enableEventListeners();
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



    press(event) {
        if (!this.root.host.contains(event.target)) {
            return;
        }

        this.root.host.classList.add("pressed");

        window.PPK.buttonsPressed.push(this);
        //console.log(window.PPK.buttonsPressed);

        this.dispatchEvent(new CustomEvent("ppk-button-press", {
            bubbles: true,
            composed: true,
        }));
    }

    unpress(event) {
        //console.group("unpressing:");

        for (const that of window.PPK.buttonsPressed) {
            //console.log(that);
            that.root.host.classList.remove("pressed");

            this.dispatchEvent(new CustomEvent("ppk-button-unpress", {
                bubbles: true,
                composed: true,
            }));
        }

        //console.groupEnd();

        window.PPK.buttonsPressed = [];
    }
}