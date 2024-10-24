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

        this.root = this.attachShadow({ mode: "open" });
        this.root.innerHTML = Button.HTML;

        this.addEventListener("pointerdown", this.press);
        this.addEventListener("pointerup", this.unpress);
    }

    press() {
        this.classList.add("pressed");

        this.dispatchEvent(new CustomEvent("ppk-button-press", {
            bubbles: true,
            composed: true,
        }));
    }

    unpress() {
        this.classList.remove("pressed");

        this.dispatchEvent(new CustomEvent("ppk-button-unpress", {
            bubbles: true,
            composed: true,
        }));
    }
}