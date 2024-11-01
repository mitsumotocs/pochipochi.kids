import { html } from "./functions.js";
import { ComponentBase } from "./ComponentBase.js";
//import { Button } from "./Button.js";

export class NumberSelector extends ComponentBase {
    static HTML = html`
        <style>
            :host {
                /*
                --background-color: #666;
                --shadow-color: #333;
                --color: #fff;
                --font-family: sans-serif;
                --font-weight: bold;
                --font-size: 20px;
                */
            }
            :host {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: 1fr;
                gap: 8px;
            }
        </style>
        <!--
        <ppk-button>minus</ppk-button>
        <output></output>
        <ppk-button>&nbsp;<i class="fa-solid fa-plus"></i></ppk-button>
        -->
    `;

    constructor() {
        super();

        this.root = this.attachShadow({ mode: "open" });
        //this.root.innerHTML = NumberSelector.HTML;

        const b1 = document.createElement("ppk-button");
        b1.textContent = "minus";
        const b2 = document.createElement("ppk-button");
        b2.textContent = "plus";
        this.root.appendChild(b1);
        this.root.appendChild(b2);


        /*
        this
            .bindEventListener(document, "pointerdown", this.press)
            .bindEventListener(document, ["pointerup", "pointercancel"], this.unpress)
            .enableEventListeners();
            */
    }

}