document.addEventListener('DOMContentLoaded', function () {
    var startBtn = document.getElementById("start");
    var stopBtn = document.getElementById("stop");
    var resetBtn = document.getElementById("reset");
    var input = document.getElementById("input");
    var timeDisplay = document.querySelector(".time")

    var timerInterval;

    function updateDisplay(hour, mins, sec) {
        timeDisplay.innerHTML = `${String(hour).padStart(2, '0')} : ${String(mins).padStart(2, '0')} : ${String(sec).padStart(2, '0')}`;
    }

    function fetchTime() {
        fetch('/get_time', {
            method: 'GET'
        }).then(response => response.json())
        .then(data => {
            updateDisplay(data.hour, data.mins, data.sec);
        }).catch(error => {
            console.error('Error fetching time:', error);
        });
    }

    function startTimerInterval() {
        timerInterval = setInterval(fetchTime, 1000);
    }

    function stopTimerInterval() {
        clearInterval(timerInterval);
    }

    startBtn.addEventListener("click", function () {
        fetch('/start', {
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                console.log('Timer started');
                startTimerInterval();
            } else {
                console.error('Error starting timer:', response.statusText);
            }
        }).catch(error => {
            console.error('Error starting timer:', error);
        });
    });

    stopBtn.addEventListener("click", function () {
        fetch('/stop', {
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                console.log('Timer stopped');
                stopTimerInterval();
                fetchTime();
            } else {
                console.error('Error stopping timer:', response.statusText);
            }
        }).catch(error => {
            console.error('Error stopping timer:', error);
        });
    });

    resetBtn.addEventListener("click", function () {
        fetch('/reset', {
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                console.log('Timer reset');
                stopTimerInterval();
                timeDisplay.innerHTML = "00 : 00 : 00";
                input.value = "";
            } else {
                console.error('Error resetting timer:', response.statusText);
            }
        }).catch(error => {
            console.error('Error resetting timer:', error);
        });
    });

    input.addEventListener("blur", function () {
        var totalSeconds = parseInt(input.value, 10);
        if (!isNaN(totalSeconds) && totalSeconds >= 0) {
            var hours = Math.floor(totalSeconds / 3600);
            var minutes = Math.floor((totalSeconds % 3600) / 60);
            var seconds = totalSeconds % 60;

            fetch('/set_time', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({hour: hours, mins: minutes, sec: seconds})
            }).then(response => {
                if (response.ok) {
                    console.log('Time set');
                    updateDisplay(hours, minutes, seconds);
                } else {
                    console.error('Error setting time:', response.statusText);
                }
            }).catch(error => {
                console.error('Error setting time:', error);
            });
        } else {
            console.error('Invalid input');
        }
    });

    fetchTime();
});