import { html } from "./functions.js";
import { ComponentBase } from "./ComponentBase.js";

export class Button extends ComponentBase {
    static HTML = html`
        <style>
            :host {
                --background-color: #666;
                --shadow-color: #333;
                --color: #fff;
                --font-family: sans-serif;
                --font-weight: bold;
                --font-size: 20px;
            }
            :host {
                display: inline-flex;
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                overflow: hidden;
                justify-content: center;
                align-items: center;
                background-color: var(--background-color);
                color: var(--color);
                box-shadow: inset 0 calc((var(--font-size) / 3) * -1) 0 0 var(--shadow-color);
                border-radius: calc(var(--font-size) / 3);
                touch-action: manipulation;
                user-select: none;
                -webkit-user-select: none;
                cursor: pointer;
            }
            :host(.pressed) {
                box-shadow: none;
                transform: translateY(calc(var(--font-size) / 3));
                height: calc(100% - (var(--font-size) / 3));
            }
            :host>label {
                display: block;
                margin-bottom: calc(var(--font-size) / 3);
                white-space: nowrap;
                font-family: var(--font-family);
                font-weight: var(--font-weight);
                font-size: var(--font-size);
            }
        </style>
        <label><slot></slot></label>
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