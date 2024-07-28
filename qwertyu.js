// script.js
let startStopBtn = document.getElementById('startStopBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.getElementById('lapBtn');
let hoursDisplay = document.getElementById('hours');
let minutesDisplay = document.getElementById('minutes');
let secondsDisplay = document.getElementById('seconds');
let millisecondsDisplay = document.getElementById('milliseconds');
let lapsList = document.getElementById('lapsList');

let stopwatchInterval;
let elapsedTime = 0;
let running = false;

startStopBtn.addEventListener('click', function() {
    if (running) {
        clearInterval(stopwatchInterval);
        startStopBtn.textContent = 'Start';
    } else {
        stopwatchInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Pause';
    }
    running = !running;
});

resetBtn.addEventListener('click', function() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    running = false;
    startStopBtn.textContent = 'Start';
    updateDisplay(0, 0, 0, 0);
    lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', function() {
    if (running) {
        let lapTime = formatTime(elapsedTime);
        let lapTimeString = `${lapTime.hours}:${lapTime.minutes}:${lapTime.seconds}:${lapTime.milliseconds}`;
        let li = document.createElement('li');
        li.textContent = lapTimeString;
        lapsList.appendChild(li);
    }
});

function updateTime() {
    elapsedTime += 10;
    let time = formatTime(elapsedTime);
    updateDisplay(time.hours, time.minutes, time.seconds, time.milliseconds);
}

function updateDisplay(hours, minutes, seconds, milliseconds) {
    hoursDisplay.textContent = hours < 10 ? '0' + hours : hours;
    minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
    millisecondsDisplay.textContent = milliseconds < 10 ? '0' + milliseconds : milliseconds;
}

function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return {
        hours: hours < 10 ? '0' + hours : hours,
        minutes: minutes < 10 ? '0' + minutes : minutes,
        seconds: seconds < 10 ? '0' + seconds : seconds,
        milliseconds: milliseconds < 10 ? '0' + milliseconds : milliseconds
    };
}
