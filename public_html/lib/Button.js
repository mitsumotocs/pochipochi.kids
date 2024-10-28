import { html } from "./functions.js";
import { ComponentBase } from "./ComponentBase.js";

export class Button extends ComponentBase {
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
        <slot></slot>
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