function sort_filter_entries(entries) {
    return to_array(entries).filter(x => ready(x)).sort((a, b) => vruntime(a) - vruntime(b));
}
function ready(task) {
    return !(task.field("Repeat From") && task.field("Repeat From").getTime() + task.field("Repeat Interval") > Date.now() || task.field("Start At") && task.field("Start At").getTime() > Date.now() || task.field("Cool down from") && task.field("Cool down from").getTime() + task.field("Cooldown") > Date.now());
}
function to_array(iterable) {
    var result = [];
    for (var i = 0; i < iterable.length; i++) {
        result.push(iterable[i]);
    }
    return result;
}
function pick(task) {
    var subtasks = sort_filter_entries(task.field("Subtasks"));
    if (subtasks.length > 0) {
        return pick(subtasks[0]);
    } else {
        return task;
    }
}
function vruntime(task) {
    return Math.pow(8, -task.field("Priority")) * task.field("Runtime");
}
var task = sort_filter_entries(lib().entries()).find(x => x.field("Root"));
pick(task).show();
