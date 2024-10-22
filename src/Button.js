export class Button extends HTMLElement {
    static HTML = `
    <style>
    @import "./Button.css";
    /*
        * {
            color: red;
        }
        :host {
            display: inline-block;
            background-color: #ccc;
            box-shadow: inset 0 -4px 0 0 #999;
            padding: 8px 8px 12px 8px;
            border-radius: 4px;
        }
            */
        </style>
    <slot>Default Label</slot>
`;

    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });
        //console.log(this.root);

        this.root.innerHTML = Button.HTML.trim();
    }
}