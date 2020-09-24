function start(task) {
    // setTimer();
    setTimerStart(task, Date.now());
}
function finish(task) {
    setRuntime(task, runtime() + elapsed());
    setPrevTime(task, elapsed());
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
function toggleRunning(task) {
    setRunning(task, !running(task));
}
function main(task) {
    if (running(task)) {
        finish(task);
    } else {
        start(task);
    }
    toggleRunning(task);
    var parent = get_parent(task);
    if (parent) {main(parent);}
}
function setRunning(task, newValue) {
    task.set("Running", newValue);
}
function running(task) {
    return task.field("Running");
}
function setTimerStart(task, newValue) {
    task.set("Repeat From", newValue);
}
function setRuntime(task, newValue) {
    task.set("Runtime", newValue);
}
function timerStart() {
    return entry().field("Repeat From");
}
function elapsed() {
    return Date.now() - timerStart();
}
function setPrevTime(task, newValue) {
    task.set("Previous Time", newValue);
}
function name() {
    return entry().field("Name");
}
function runtime() {
    return entry().field("Runtime");
}
