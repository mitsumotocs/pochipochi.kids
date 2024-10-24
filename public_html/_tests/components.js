import { PPK } from "../lib/PPK.js";

customElements.define("ppk-button", PPK.Button);

document.addEventListener("ppk-button-press", (event) => {
    console.log(event.type, event.target);
});