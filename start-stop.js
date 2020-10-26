function start(task) {
    if (task == entry()) { setTimer(); }
    task.set("Timer start", Date.now());
}
function finish(task) {
    task.set("Runtime", task.field("Runtime") + elapsed());
    if (task == entry()) { updateWaitTimes(elapsed()); }
    task.set("Wait time", 0);
}
function setTimer() {
    AndroidAlarm.timer(Math.max(timeSlice() / 1000, 16 * 60), entry().field("Name"), false);
}
function timeSlice() {
    return entry().field("Wait time") / leafTasks().length;
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
    if (parent) { main(parent); }
}
function elapsed() {
    return Date.now() - entry().field("Timer start");
}
function leafTasks() {
    return to_array(lib().entries()).filter(x => x.field("Subtasks").length == 0);
}
function updateWaitTimes(duration) {
    var entries = lib().entries();
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        entry.set("Wait time", entry.field("Wait time") + duration);
    }
}
