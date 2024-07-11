import { data } from "./script/convert.js";

let convertChoice = false;    
const convertLeft = document.getElementById("input-convert-left");
const convertRight = document.getElementById("input-convert-right");
const uniteGauche = document.getElementById("unite-1");
const uniteDroite = document.getElementById("unite-2");
const buttonsEl = document.querySelectorAll("button");
let convertType = "";

buttonsEl.forEach(button => {
    button.addEventListener("click", handleButtonClick);
});

convertLeft.addEventListener("input", function() {
    if (!convertChoice) {
        convertLeft.value = "";
        convertRight.value = "";
        return;
    } else {
        convertCalc();
    }
});

uniteDroite.addEventListener("change", function() {
    if (!convertChoice) {
        return;
    } else {
        convertCalc();
    }
});

uniteGauche.addEventListener("change", function() {
    if (!convertChoice) {
        return;
    } else {
        convertCalc();
    }
});

function handleButtonClick(event) {
    const buttonId = event.target.id;
    switch (buttonId) {
        case "longueur":
            convert("longueur");
            convertChoice = true;
            convertReset();
            break;
        case "temps":
            convert("temps");
            convertChoice = true;
            convertReset();
            break;
        case "masse":
            convert("masse");
            convertChoice = true;
            convertReset();
            break;
        default:
            console.log("Type d'unité non reconnu");
    }
}

function convert(name) {
    uniteGauche.innerHTML = "";
    uniteDroite.innerHTML = "";
    const val = data.find(item => item.name === name);
    convertType = val;
    for (let i = 0; i < val.option.length; i++) {
        const option = document.createElement("option");
        option.text = val.option[i].name;
        uniteGauche.add(option);
        uniteDroite.add(option.cloneNode(true));
    }
}

function convertCalc() {
    let val1 = convertLeft.value;
    let valueLeft = convertType.option[uniteGauche.selectedIndex].value;
    let valueRight = convertType.option[uniteDroite.selectedIndex].value;
    let result = val1 * valueLeft / valueRight;
    convertRight.value = result;
}

function convertReset() {
    convertLeft.value = "";
    convertRight.value = "";
}