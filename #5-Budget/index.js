const inputBudgetEl = document.getElementById('addArgent_input');
const inputDepenseNameEl = document.getElementById('depense_nom_input');
const inputDepenseValueEl = document.getElementById('depense_valeur_input');

const buttonAddArgentEl = document.getElementById('addArgent_bouton');
const buttonAddDepenseEl = document.getElementById('depense_bouton');

const budgetEl = document.getElementById('argent');
const depenseEl = document.getElementById('depense');
const resteEl = document.getElementById('restant');

const depenseListEl = document.querySelector('.list');

let budget = 0;
let depense = 0;
let reste = 0;

buttonAddArgentEl.addEventListener('click', () => {
    if (inputBudgetEl.value === '') {
        inputBudgetEl.value = '';
        return;
    } else {
        budget += parseFloat(inputBudgetEl.value);
        budgetEl.textContent = budget;
        reste = budget - depense;
        resteEl.textContent = reste;
        inputBudgetEl.value = '';
    }
});

buttonAddDepenseEl.addEventListener('click', () => {
    if (inputDepenseNameEl.value === '' || inputDepenseValueEl.value === '') {
        inputDepenseNameEl.value = '';
        inputDepenseValueEl.value = '';
        return;
    } else {
        let name = inputDepenseNameEl.value;
        let value = parseFloat(inputDepenseValueEl.value);
        depense += value;
        reste = budget - depense;
        depenseEl.textContent = depense;
        resteEl.textContent = reste;

        inputDepenseNameEl.value = '';
        inputDepenseValueEl.value = '';
        listCreator(name, value);
    }
});

const listCreator = (name, value) => {
    let subListContent = document.createElement("div");
    subListContent.classList.add("list_content", "flex-space");
    list.appendChild(subListContent);
    subListContent.innerHTML = `<p class="nom">${name}</p><p class="valeur">${value}</p>`;
    
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash", "delete");
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });

    subListContent.appendChild(editButton);
    subListContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(subListContent);
};

const modifyElement = (element, isEdit = false) => {
    let parent = element.parentElement;
    let nom = parent.querySelector(".nom").textContent;
    let valeur = parent.querySelector(".valeur").textContent;

    if (isEdit) {
        inputDepenseNameEl.value = nom;
        inputDepenseValueEl.value = valeur;
        depense -= parseFloat(valeur);
        reste = budget - depense;
        depenseEl.textContent = depense;
        resteEl.textContent = reste;
        parent.remove();
    } else {
        depense -= parseFloat(valeur);
        reste = budget - depense;
        depenseEl.textContent = depense;
        resteEl.textContent = reste;
        parent.remove();
    }
};