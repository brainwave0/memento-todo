function start(task) {
    setTimer();
    setTimerStart(task, Date.now());
}
function finish(task) {
    setRuntime(task, runtime() + elapsed());
    setPrevTime(task, elapsed());
    updateWaitTimes(elapsed());
    task.set("Wait time", 0);
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
    AndroidAlarm.timer(Math.min(timeSlice() / 1000, 120), name(), false);
}
function timeSlice() {
    return entry().field("Wait time") / entryAndSiblings().length;
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
function entryAndSiblings() {
    return get_parent(entry()).field("Subtasks");
}
function updateWaitTimes(duration) {
    var entries = lib().entries();
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        entry.set("Wait time", entry.field("Wait time") + duration);
    }
}
