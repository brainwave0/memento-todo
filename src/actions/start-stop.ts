/// <reference path="../android-alarm"/>
/// <reference path="../memento-database"/>
/// <reference path="../settings"/>
/// <reference path="../util"/>

function start(task: Entry): void {
    setTimer();
    create_log_entry('Started task "' + entry().field("Name") + '"');
    task.set("Timer start", Date.now());
}
function finish(task: Entry): void {
    create_log_entry('Finished task "' + entry().field("Name") + '"');
    task.set("Runtime", task.field("Runtime") + elapsed());
    task.set("Wait time", 0);
    task.set("Value", task.field("Value") + arg("Rating"));
    task.set("Latest attempt", Date.now());
}
function setTimer() {
    AndroidAlarm.timer(timer_duration, entry().field("Name"), false);
}
function toggleRunning(task) {
    task.set("Running", !task.field("Running"));
}
function elapsed() {
    return Date.now() - entry().field("Timer start");
}
function create_log_entry(text: string): void {
    libByName("Log").create({ Description: text, Datetime: Date.now() });
}
if (entry().field("Running")) {
    finish(entry());
} else {
    start(entry());
}
toggleRunning(entry());

