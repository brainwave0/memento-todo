function start(task) {
    setTimer();
    create_log_entry('Started task "' + entry().field("Name") + '"');
    task.set("Timer start", Date.now());
}
function finish(task) {
    task.set("Runtime", task.field("Runtime") + elapsed());
    updateWaitTimes(elapsed());
    create_log_entry('Finished task "' + entry().field("Name") + '"');
    task.set("Wait time", 0);
}
function setTimer() {
    AndroidAlarm.timer(Math.max(timeSlice() / 1000, 16 * 60), entry().field("Name"), false);
}
function timeSlice() {
    return entry().field("Wait time") / lib().entries().length;
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
}
function elapsed() {
    return Date.now() - entry().field("Timer start");
}
function updateWaitTimes(duration) {
    var entries = lib().entries();
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (ready(entry)) {
            entry.set("Wait time", entry.field("Wait time") + duration);
        }
    }
}
function create_log_entry(text) {
    libByName("Log").create({ Description: text, Datetime: Date.now() });
}
