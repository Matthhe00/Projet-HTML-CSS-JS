const tailleCellule = document.getElementById('myRange');
const tailleLabel = document.getElementById('taille');
const tableauElem = document.getElementById('tableau');
const boutonListe = document.querySelectorAll('.button');
let tableau = [];
let interval;
let estEnCours = false;
let count = 0;

boutonListe.forEach(button => button.addEventListener('click', () => actionClick(button.id)));

tailleCellule.addEventListener('input', function() {
    tailleLabel.innerHTML = tailleCellule.value;
    creerTableau(tailleCellule.value);
});

function actionClick(e) {
    if (e === 'start') {
        startAction();
    } else if (e === 'stop') {
        stopAction();
    } else if (e === 'reset') {
        resetAction();
    }
}

function startAction() {
    if (!estEnCours) {
        estEnCours = true;
        interval = setInterval(updateTableau, 100);
        boutonListe[0].disabled = true;
        boutonListe[1].disabled = false;
        boutonListe[2].disabled = false;
    }
}

function stopAction() {
    clearInterval(interval);
    estEnCours = false;
    boutonListe[0].disabled = false;
    boutonListe[1].disabled = true;
    boutonListe[2].disabled = false;
}

function resetAction() {
    stopAction();
    creerTableau(tailleCellule.value);
}

function creerTableau(taille) {
    tableau = [];
    let tableauHTML = '<table>';
    const nombreColonnes = Math.floor(tableauElem.clientWidth / taille);

    tableauElem.style.height = `${nombreColonnes * taille}px`;

    for (let i = 0; i < nombreColonnes; i++) {
        tableauHTML += '<tr>';
        let ligne = [];
        for (let j = 0; j < nombreColonnes; j++) {
            tableauHTML += `<td data-x="${i}" data-y="${j}" class="dead" style="width:${taille}px; height:${taille}px;"></td>`;
            ligne.push(0);
        }
        tableauHTML += '</tr>';
        tableau.push(ligne);
    }
    tableauHTML += '</table>';
    tableauElem.innerHTML = tableauHTML;

    document.querySelectorAll('td').forEach(cell => {
        cell.addEventListener('click', colorer);
    });
}

function colorer() {
    const x = parseInt(this.getAttribute('data-x'));
    const y = parseInt(this.getAttribute('data-y'));

    if (tableau[x][y] === 0) {
        tableau[x][y] = 1;
        this.style.backgroundColor = "#f3ca14";
        this.classList.remove('dead');
        this.classList.add('alive');
    } else {
        tableau[x][y] = 0;
        this.style.backgroundColor = "#0b0b0d";
        this.classList.remove('alive');
        this.classList.add('dead');
    }
}

function updateTableau() {
    const nouveauTableau = tableau.map(arr => [...arr]);

    for (let x = 0; x < tableau.length; x++) {
        for (let y = 0; y < tableau[x].length; y++) {
            const voisins = compterVoisins(x, y);

            if (tableau[x][y] === 1) {
                if (voisins < 2 || voisins > 3) {
                    nouveauTableau[x][y] = 0;
                }
            } else {
                if (voisins === 3) {
                    nouveauTableau[x][y] = 1;
                }
            }
        }
    }

    for (let x = 0; x < tableau.length; x++) {
        for (let y = 0; y < tableau[x].length; y++) {
            tableau[x][y] = nouveauTableau[x][y];
            const cell = document.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
            cell.style.backgroundColor = tableau[x][y] === 1 ? "#f3ca14" : "#0b0b0d";
            cell.classList.remove(tableau[x][y] === 1 ? 'dead' : 'alive');
        }
    }
    count++;
}

function compterVoisins(x, y) {
    let count = 0;
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    directions.forEach(([dx, dy]) => {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < tableau.length && ny >= 0 && ny < tableau[nx].length) {
            count += tableau[nx][ny];
        }
    });

    return count;
}

// Initialiser
tailleLabel.innerHTML = tailleCellule.value;
creerTableau(tailleCellule.value);

