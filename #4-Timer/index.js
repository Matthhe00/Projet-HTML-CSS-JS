const timerEl = document.getElementById('timer');
const buttonEl = document.querySelectorAll('.button_timer');
const tourEl = document.querySelector('.tour_div');

let isRunning = false;
let nbTour = 1;

let startTime = 0;
let currentTime = 0;
let timerInterval;

buttonEl.forEach(button => button.addEventListener('click', () => actionClick(button.id)));

const actionClick = e => {
    if (e === 'start') {
        startAction();
    } else if (e === 'stop') {
        stopAction();
    } else if (e === 'reset') {
        resetAction();
    } else if (e === 'tour') {
        tourAction();
    }
}

function startAction() {
    isRunning = true;
    startTime = Date.now() - currentTime;

    timerInterval = setInterval(() => {
        currentTime = Date.now() - startTime;
        timerEl.textContent = formatTime(currentTime);
    }, 10);

    buttonEl[0].disabled = true;
    buttonEl[1].disabled = false;
    buttonEl[2].disabled = false;
}

function stopAction() {
    clearInterval(timerInterval);
    buttonEl[0].disabled = false;
    buttonEl[1].disabled = true;
    buttonEl[2].disabled = false;
}

function resetAction() {
    isRunning = false;
    clearInterval(timerInterval);
    currentTime = 0;
    timerEl.textContent = '00:00:00';

    nbTour = 1;
    tourEl.innerHTML = '';
    buttonEl[0].disabled = false;
    buttonEl[1].disabled = true;
    buttonEl[2].disabled = false;
}

function tourAction() {
    if (!isRunning) return;
    let html = `<div class="tour">Tour n°${nbTour} : ${formatTime(currentTime)}</div>`;
    tourEl.innerHTML += html;
    nbTour++;
}

function formatTime(currentTime) {
    const milliseconds = Math.floor((currentTime % 1000) / 10);
    const seconds = Math.floor((currentTime % (1000 * 60)) / 1000);
    const minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor(currentTime / (1000 * 60 * 60));
    return (
      (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
      ":" +
      (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
      ":" +
      (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") +
      "." +
      (milliseconds > 9 ? milliseconds : "0" + milliseconds)
    );
  }