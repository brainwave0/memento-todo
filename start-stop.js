function start(task) {
    if (task == entry()) {
        setTimer();
        create_log_entry('Started task "' + entry().field("Name") + '"');
    }
    task.set("Timer start", Date.now());
}
function finish(task) {
    task.set("Runtime", task.field("Runtime") + elapsed());
    if (task == entry()) {
        updateWaitTimes(elapsed());
        create_log_entry('Finished task "' + entry().field("Name") + '"');
    }
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
function create_log_entry(text) {
    libByName("Log").create({ Description: text, Datetime: Date.now() });
}
