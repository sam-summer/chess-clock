var started = false;
var turn = "t1"
duration = 1200;
var t1 = duration;
var t2 = duration;
var intervalFunction = window.setInterval(function () {
    decrement()
}, 1000);

function decrement() {
    var t1M = document.getElementById("t1M");
    var t1S = document.getElementById("t1S");
    var t2M = document.getElementById("t2M");
    var t2S = document.getElementById("t2S");
    if (started === true) {
        if (turn === "t1") {
            t1--;
            var min1 = Math.floor(t1 / 60)
            if (min1 < 10) {
                min1 = "0" + min1
            }
            var sec1 = t1 % 60;
            if (sec1 < 10) {
                sec1 = "0" + sec1
            }
            t1M.innerHTML = min1;
            t1S.innerHTML = sec1;
        } else if (turn === "t2") {
            t2--;
            var min2 = Math.floor(t2 / 60)
            if (min2 < 10) {
                min2 = "0" + min2
            }
            var sec2 = t2 % 60;
            if (sec2 < 10) {
                sec2 = "0" + sec2
            }
            t2M.innerHTML = min2;
            t2S.innerHTML = sec2;
        }
    }
    if (t1 === 0 || t2 === 0) {
        endGame();
    }
}

function handleClick() {
    if (started === false) {
        if (t1 === 0 || t2 === 0) {
            restartGame();
        } else {
            startGame();
        }
    } else {
        switchTurn();
    }
}

function startGame() {
    var btn = document.getElementById("switch-btn");
    var pauseBtn = document.getElementById("pause-btn");
    btn.innerHTML = "SWITCH";
    pauseBtn.innerHTML = "PAUSE"
    started = true;
}

function switchTurn() {
    var t1El = document.getElementById("t1");
    var t2El = document.getElementById("t2");
    if (turn === "t1") {
        turn = "t2";
        t1El.style.color = "#666";
        t2El.style.color = "#fff";
    } else if (turn === "t2") {
        turn = "t1";
        t1El.style.color = "#fff";
        t2El.style.color = "#666";
    }
}

function endGame() {
    var btn = document.getElementById("switch-btn");
    started = false;
    btn.innerHTML = "RESTART";
    if (t1 === 0) {
        t1Lost();
    } else if (t2 === 0) {
        t2Lost();
    }
}

function t1Lost() {
    var t1El = document.getElementById("t1");
    var t1M = document.getElementById("t1M");
    var t1Colon = document.getElementById("t1Colon");
    var t1S = document.getElementById("t1S");
    t1El.style.background = "#bd1300";
    t1M.style.fontSize = "4vw";
    t1M.innerHTML = "OUT OF TIME";
    t1Colon.style.display = "none";
    t1S.style.display = "none";
}

function t2Lost() {
    var t2El = document.getElementById("t2");
    var t2M = document.getElementById("t2M");
    var t2Colon = document.getElementById("t2Colon");
    var t2S = document.getElementById("t2S");
    t2El.style.background = "#bd1300";
    t2M.style.fontSize = "4vw";
    t2M.innerHTML = "OUT OF TIME";
    t2Colon.style.display = "none";
    t2S.style.display = "none";
}

function restartGame() {
    if (t1 === 0) {
        t1Restyle();
    } else if (t2 === 0) {
        t2Restyle();
    }
    resetClock();
    startGame();
}

// Call after t1 times out
function t1Restyle() {
    var t1El = document.getElementById("t1");
    var t1M = document.getElementById("t1M");
    var t1S = document.getElementById("t1S");
    t1El.style.background = "transparent";
    t1M.style.fontSize = "12vw";
    t1Colon.style.display = "inline";
    t1S.style.display = "inline";
}

// Call after t2 times out
function t2Restyle() {
    var t2El = document.getElementById("t2");
    var t2M = document.getElementById("t2M");
    var t2S = document.getElementById("t2S");
    t2El.style.background = "transparent";
    t2M.style.fontSize = "12vw";
    t2Colon.style.display = "inline";
    t2S.style.display = "inline";
}

function showSettings() {
    var settings = document.getElementById("settings-wrapper");
    settings.style.left = "0";
}

function cancelSettings() {
    var targetMin = Math.floor(duration / 60);
    var targetSec = duration % 60;
    document.getElementById("min").value = targetMin;
    document.getElementById("sec").value = targetSec;
    hideSettings();
}

function hideSettings() {
    var settings = document.getElementById("settings-wrapper");
    settings.style.left = "-100vw";
}

function setClock() {
    var min = document.getElementById("min").value;
    var sec = document.getElementById("sec").value;
    duration = (min * 6) + sec;
    resetClock();
    hideSettings();
}

function resetClock() {
    if (t1 === 0) {
        t1Restyle();
    } else if (t2 === 0) {
        t2Restyle();
    }
    var min = document.getElementById("min").value;
    var sec = document.getElementById("sec").value;
    var t1El = document.getElementById("t1");
    var t1M = document.getElementById("t1M");
    var t1S = document.getElementById("t1S");
    var t2El = document.getElementById("t2");
    var t2M = document.getElementById("t2M");
    var t2S = document.getElementById("t2S");
    var btn = document.getElementById("switch-btn");
    var pauseBtn = document.getElementById("pause-btn");
    started = false;
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    t1M.innerHTML = min;
    t1S.innerHTML = sec;
    t2M.innerHTML = min;
    t2S.innerHTML = sec;
    t1El.style.color = "#fff";
    t2El.style.color = "#666";
    btn.innerHTML = "START";
    pauseBtn.innerHTML = "PAUSE";
    turn = "t1"
    t1 = duration;
    t2 = duration;
}

function togglePause() {
    if (started === true) {
        pause();
    } else if (
        started === false &&
        (t1 !== duration || t2 !== duration) &&
        (t1 !== 0 && t2 !== 0)
    ) {
        unpause();
    }
}

function pause() {
    var btn = document.getElementById("switch-btn");
    var pauseBtn = document.getElementById("pause-btn");
    started = false;
    btn.innerHTML = "UNPAUSE";
    pauseBtn.innerHTML = "UNPAUSE";
}

function unpause() {
    var btn = document.getElementById("switch-btn");
    var pauseBtn = document.getElementById("pause-btn");
    started = true;
    btn.innerHTML = "SWITCH";
    pauseBtn.innerHTML = "PAUSE";
}
