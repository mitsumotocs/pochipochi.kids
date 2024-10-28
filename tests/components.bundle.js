function html(strings) {
    return strings.join().trim();
}

class ComponentBase extends HTMLElement {
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

class Button extends ComponentBase {
    static HTML = html`
        <style>
            * {
                box-sizing: border-box;
            }
            :host {
                --background-color: #666;
                --shadow-color: #333;
                --color: #fff;
                --font-family: sans-serif;
            }
            :host {
                display: inline-block;
                background-color: var(--background-color);
                color: var(--color);
                box-shadow: inset 0 -4px 0 0 var(--shadow-color);
                padding: 8px 8px 12px 8px;
                border-radius: 4px;
                font-weight: bold;
                font-family: var(--font-family);
            }
            :host(.pressed) {
                box-shadow: none;
                padding-bottom: calc(12px - 4px);
                transform: translateY(4px);
            }
        </style>
        <slot>Button</slot>
    `;

    constructor() {
        super();

        this.root = this.attachShadow({ mode: "open" });
        this.root.innerHTML = Button.HTML;

        window.PPK.buttonsPressed ||= [];

        this
            .bindEventListener(document, "pointerdown", this.press)
            .bindEventListener(document, ["pointerup", "pointercancel"], this.unpress)
            .enableEventListeners();
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

const PPK = {
    Button,
};

window.PPK = PPK;

//console.log(window.PPK);

customElements.define("ppk-button", PPK.Button);

document.addEventListener("ppk-button-press", (event) => {
    console.log(event.type, event.target);
});

document.addEventListener("ppk-button-unpress", (event) => {
    console.log(event.type, event.target);
});

/*
const buttons = document.querySelectorAll("ppk-button");
//console.log(buttons);
buttons.item(0).addEventListener("ppk-button-press", (event) => {
    console.log(event.type, event.target);
});
*/
