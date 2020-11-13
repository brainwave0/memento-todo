function start(task) {
    toggleRunning(task);
    create_log_entry('Started task "' + task.field("Name") + '"');
    task.set("Timer start", Date.now());
    if (is_root(task)) {
        start_timers(task);
    } else if (!get_parent(task).field("Running")) {
        start(get_parent(task));
    }
}
function finish(task) {
    task.set("Runtime", task.field("Runtime") + elapsed());
    if (!get_parent(task)) { updateWaitTimes(elapsed()); }
    create_log_entry('Finished task "' + entry().field("Name") + '"');
    task.set("Wait time", 0);
    if (running_child(task)) { finish(running_child(task)) }
    toggleRunning(task);
}
function setTimer(task, duration) {
    AndroidAlarm.timer(duration, task.field("Name"), false);
}
function time_slice(duration, tasks, task) {
    return task.field("Priority") / tasks.map(x => x.field("Priority")).reduce((a, b) => a + b, 0) * duration;
}
function toggleRunning(task) {
    task.set("Running", !task.field("Running"));
}
function main() {
    if (entry().field("Running")) {
        finish(entry());
    } else {
        start(entry());
    }
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
function max_wait_time(task) {
    var max = 0;
    var subtasks = task.field("Subtasks");
    for (var i = 0; i < subtasks.length; i++) {
        if (subtasks[i].field("Subtasks").length > 0) {
            max = Math.max(max, max_wait_time(subtasks[i]));
        } else {
            max = Math.max(max, subtasks[i].field("Wait time"));
        }
    }
    return max;
}
function is_root(task) {
    return get_parent(task) == undefined;
}
function start_timers(task) {
    function start_timers_helper(task, duration) {
        var subtasks = task.field("Subtasks");
        if (duration > 0) {
            setTimer(task, duration);
            if (subtasks.length > 0) {
                start_timers_helper(
                    running_child(task),
                    time_slice(duration, to_array(subtasks), task)
                );
            }
        }
    }
    start_timers_helper(task, max_wait_time(task));
}
function running_child(task) {
    return to_array(task.field("Subtasks")).find(x => x.field("Running"));
}
