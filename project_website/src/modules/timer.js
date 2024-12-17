import { log } from "neo-async";

const timer = (deadline) => {
  const timerHours = document.getElementById("timer-hours");
  const timerMinutes = document.getElementById("timer-minutes");
  const timerSeconds = document.getElementById("timer-seconds");

  const getTimerRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = new Date().getTime();
    const timeRemaining = (dateStop - dateNow) / 1000;
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = Math.floor(timeRemaining % 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return {
      timeRemaining,
      formattedHours,
      formattedMinutes,
      formattedSeconds,
    };
  };

  let getTime = getTimerRemaining();

  if (getTime.timeRemaining <= 0) {
    timerHours.textContent = "00";
    timerMinutes.textContent = "00";
    timerSeconds.textContent = "00";
  } else {
    const updateClock = () => {
      getTime = getTimerRemaining();
      timerHours.textContent = getTime.formattedHours;
      timerMinutes.textContent = getTime.formattedMinutes;
      timerSeconds.textContent = getTime.formattedSeconds;
    };

    updateClock();

    let timerInterval = setInterval(() => {
      getTime = getTimerRemaining();
      if (getTime.timeRemaining <= 0) {
        clearInterval(timerInterval);
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
      } else {
        updateClock();
      }
    }, 1000);
  }
};
const deadline = "2025-31-31T23:59:59";  // Set your deadline here
timer(deadline);
export default timer;
