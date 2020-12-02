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
function adjust_priority(entry, amount) {
    var all_tasks = get_all_tasks();
    var avg_priority = sum(all_tasks.map(function (x) { return x.field("Importance"); })) /
        all_tasks.length;
    if (avg_priority < 0 && amount < 0 || avg_priority >= 0 && amount > 0) {
        adjust_other(entry, -amount);
    }
    else if (avg_priority < 0 && amount > 0 || avg_priority >= 0 && amount < 0) {
        entry.set("Importance", entry.field("Importance") + amount);
    }
}
function adjust_other(entry, amount) {
    get_all_tasks().filter(function (x) { return x.id != entry.id; }).forEach(function (x) { return x.set("Importance", x.field("Importance") + amount); });
}
adjust_priority(entry(), 1);
