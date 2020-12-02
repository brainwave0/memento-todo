var Entry = (function () {
    function Entry() {
    }
    Entry.prototype.field = function (name) {
        return this.fields[name];
    };
    Entry.prototype.set = function (name, value) {
        this.fields[name] = value;
    };
    return Entry;
}());
var Entries = (function () {
    function Entries() {
    }
    return Entries;
}());
var Library = (function () {
    function Library() {
    }
    Library.prototype.entries = function () {
        return entries;
    };
    Library.prototype.create = function (values) {
        return;
    };
    return Library;
}());
function entry() {
    return current_entry;
}
function lib() {
    return library;
}
function arg(name) {
    return args[name];
}
function libByName(name) {
    return new Library();
}
var current_entry;
var library;
var entries;
var args;
var AndroidAlarm = {
    create: function (hour, minutes, message, options) {
        i = intent("android.intent.action.SET_ALARM");
        i.extraInt("android.intent.extra.alarm.HOUR", hour);
        i.extraInt("android.intent.extra.alarm.MINUTES", minutes);
        if (message !== undefined)
            i.extra("android.intent.extra.alarm.MESSAGE", message);
        if (options !== undefined) {
            if (options.days !== undefined)
                i.extraArrayInt("android.intent.extra.alarm.DAYS", options.days);
            if (options.vibrate !== undefined)
                i.extraBool("android.intent.extra.alarm.VIBRATE", options.vibrate);
            if (options.skipUI !== undefined)
                i.extraBool("android.intent.extra.alarm.SKIP_UI", options.skipUI);
        }
        i.send();
    },
    timer: function (length, message, skipUI) {
        i = intent("android.intent.action.SET_TIMER");
        i.extraInt("android.intent.extra.alarm.LENGTH", length);
        if (message !== undefined)
            i.extra("android.intent.extra.alarm.MESSAGE", message);
        if (skipUI !== undefined)
            i.extraBool("android.intent.extra.alarm.SKIP_UI", skipUI);
        i.send();
    },
};
var timer_duration = 24 * 60;
function to_array(iterable) {
    var result = [];
    for (var i = 0; i < iterable.length; i++) {
        result.push(iterable[i]);
    }
    return result;
}
function ready(task) {
    return (!task.field("Start datetime") || task.field("Start datetime") < Date.now());
}
function active_tasks() {
    return to_array(lib().entries())
        .filter(function (x) { return ready(x); });
}
function get_all_tasks() {
    return to_array(lib().entries());
}
function sum(nums) {
    return nums.reduce(function (a, b) { return a + b; }, 0);
}
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
    task.set("Expensiveness", task.field("Expensiveness") + elapsed() / arg("Rating"));
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
if (entry().field("Running")) {
    finish(entry());
}
else {
    start(entry());
}
toggleRunning(entry());
