function start() {
    // setTimer();
    setTimerStart(Date.now());
}
function finish() {
    if (enjoyed() > 0) {
        increasePriority();
    } else if (enjoyed() < 0) {
        decreasePriority();
    }
    setRuntime(runtime() + elapsed());
    setPrevTime(elapsed());
}
function enjoyed() {
    return arg("Enjoyed");
}
function increasePriority() {
    setPriority(priority() + 1);
}
function setPriority(newValue) {
    entry().set("Priority", newValue);
}
function priority() {
    return entry().field("Priority");
}
function decreasePriority() {
    setPriority(priority() - 1);
}
function setTimer() {
    AndroidAlarm.timer(timeSlice() / 1000, name(), false);
}
function timeSlice() {
    return prevTime();
}
function prevTime() {
    return entry().field("Previous Time");
}
function toggleRunning() {
    setRunning(!running());
}
function main() {
    if (running()) {
        finish();
    } else {
        start();
    }
    toggleRunning();
}
function setRunning(newValue) {
    entry().set("Running", newValue);
}
function running() {
    return entry().field("Running");
}
function setTimerStart(newValue) {
    entry().set("Repeat From", newValue);
}
function setRuntime(newValue) {
    entry().set("Runtime", newValue);
}
function timerStart() {
    return entry().field("Repeat From");
}
function elapsed() {
    return Date.now() - timerStart();
}
function setPrevTime(newValue) {
    entry().set("Previous Time", newValue);
}
function name() {
    return entry().field("Name");
}
function runtime() {
  return entry().field("Runtime");
}
main();
