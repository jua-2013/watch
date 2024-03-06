class StopWatch {
  #elaspsedTimeInSeconds = 0;
  #intervalID = null;

  start(callback = () => {}) {
    this.#intervalID = setInterval(() => {
      this.#elaspsedTimeInSeconds++;
      callback(this.elaspsedTime);
    }, 1000);
  }
  stop(callback = () => {}) {
    clearInterval(this.#intervalID);
    callback();
  }
  reset(callback = () => {}) {
    this.#elaspsedTimeInSeconds = 0;
    callback(this.elaspsedTime);
  }

  get elaspsedTime() {
    return StopWatch.formatTime(this.#elaspsedTimeInSeconds);
  }

  static formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600); //1
    const minutes = Math.floor((timeInSeconds % 3600) / 60); // 26
    const seconds = timeInSeconds - hours * 3600 - minutes * 60; //40

    return `${StopWatch.zeroPadding(hours)}:${StopWatch.zeroPadding(
      minutes
    )}:${StopWatch.zeroPadding(seconds)}`;
  }
  static zeroPadding(originalNumber, desiredAmountDigits = 2) {
    let stringNumber = String(originalNumber);
    const zeroRequired = desiredAmountDigits - stringNumber.length;

    if (zeroRequired <= 0) {
      return stringNumber;
    }
    for (let couter = 0; couter < zeroRequired; couter++) {
      stringNumber = `0${stringNumber}`;
    }
    return stringNumber;
  }
}

const sw1 = new StopWatch();
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const display = document.getElementById("stopwatch-display");

function inserirText(text) {
  display.innerText = text;
}
startButton.addEventListener("click", () => {
  sw1.start(inserirText);
  startButton.classList.add("hidden");
});
stopButton.addEventListener("click", () => {
  sw1.stop();
  startButton.classList.remove("hidden");
});
resetButton.addEventListener("click", () => {
  sw1.reset(inserirText);
});
