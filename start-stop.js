function start(task) {
    setTimer();
    task.set("Timer start", Date.now());
}
function finish(task) {
    task.set("Runtime", entry.field("Runtime") + elapsed());
    updateWaitTimes(elapsed());
    task.set("Wait time", 0);
}
function setTimer() {
    AndroidAlarm.timer(Math.min(timeSlice() / 1000, 120), entry().field("Name"), false);
}
function timeSlice() {
    return entry().field("Wait time") / entryAndSiblings().length;
}
function toggleRunning(task) {
    task.set("Running", !task.field("Running"));
}
function main(task) {
    if (task.field("Running")) {
        finish(task);
    } else {
        start(task);
    }
    toggleRunning(task);
    var parent = get_parent(task);
    if (parent) {main(parent);}
}
function elapsed() {
    return Date.now() - timerStart();
}
function entryAndSiblings() {
    var parent = get_parent(entry());
    if (parent) {
        return parent.field("Subtasks");
    } else {
        return [entry()];
    }
}
function updateWaitTimes(duration) {
    var entries = lib().entries();
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        entry.set("Wait time", entry.field("Wait time") + duration);
    }
}
