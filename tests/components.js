/*
import { Button } from "../src/Button.js"; 
console.log(Button);

customElements.define('ppk-button', Button);
*/

import { PPK } from "../src/PPK.js";
//console.log(PPK);

customElements.define('ppk-button', PPK.Button);

document.addEventListener("ppk-button-press", (event) => {
    console.log(event.type, event.target);
});