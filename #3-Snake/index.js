const panneauJeu = document.querySelector(".panneau-jeu");
const score = document.querySelector(".score");
const meilleurScore = document.querySelector(".meilleur-score");
const controles = document.querySelectorAll(".controles button");

let gameOver = false;
let nourritureX, nourritureY;
let snakeX = 5, snakeY = 5;
let velociteX = 0, velociteY = 0;
let snakeCorps = [];
let setIntervalId;
let scoreValue = 0;

let highScore = localStorage.getItem("meilleur-score") || 0;
meilleurScore.innerText = `Meilleur score: ${highScore}`;

const modifPositionNourriture = () => {
    nourritureX = Math.floor(Math.random() * 30) + 1;
    nourritureY = Math.floor(Math.random() * 30) + 1;
    for(let i = 0; i < snakeCorps.length; i++) {
        if (nourritureX === snakeCorps[i][0] && nourritureY === snakeCorps[i][1]) {
            modifPositionNourriture();
        }
    }
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Perdu ! Clicker sur OK pour rejouer ..."); 
    location.reload();
}

const changeDirection = e => {
    if (e.id === "ArrowUp" && velociteY != 1) {
        velociteX = 0;
        velociteY = -1;
    } else if (e.id === "ArrowDown" && velociteY != -1) {
        velociteX = 0;
        velociteY = 1;
    } else if (e.id === "ArrowLeft" && velociteX != 1) {
        velociteX = -1;
        velociteY = 0;
    } else if (e.id === "ArrowRight" && velociteX != -1) {
        velociteX = 1;
        velociteY = 0;
    }
}

controles.forEach(button => button.addEventListener("click", () => changeDirection({id: button.id})));

document.addEventListener('keydown', function(event) {
    changeDirection({id: event.key});
});

const initPartie = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class="nourriture" style="grid-area: ${nourritureY} / ${nourritureX}"></div>`;

    if (snakeX === nourritureX && snakeY === nourritureY) {
        modifPositionNourriture();
        snakeCorps.push([nourritureX, nourritureY]);
        scoreValue++;
        highScore = scoreValue >= highScore ? scoreValue : highScore;

        localStorage.setItem("meilleur-score", highScore);
        score.innerText = `Score: ${scoreValue}`;
        meilleurScore.innerText = `Meilleur score: ${highScore}`;

    }

    snakeX += velociteX;
    snakeY += velociteY;

    for(let i = snakeCorps.length - 1; i > 0; i--) {
        snakeCorps[i] = snakeCorps[i - 1];
    }

    snakeCorps[0] = [snakeX, snakeY];

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    for(let i = 0; i < snakeCorps.length; i++) {
        html += `<div class="snake-tete" style="grid-area: ${snakeCorps[i][1]} / ${snakeCorps[i][0]}"></div>`;
        if (i !== 0 && snakeCorps[0][1] === snakeCorps[i][1] && snakeCorps[0][0] === snakeCorps[i][0]) {
            gameOver = true;
        }
    }

    panneauJeu.innerHTML = html;
}

modifPositionNourriture();
setIntervalId = setInterval(initPartie, 100);
document.addEventListener("keyup", changeDirection);


