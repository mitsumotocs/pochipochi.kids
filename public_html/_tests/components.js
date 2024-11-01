import { PPK } from "../lib/PPK.js";
//console.log(window.PPK);

customElements.define("ppk-button", PPK.Button);
customElements.define("ppk-numberselector", PPK.NumberSelector);

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
