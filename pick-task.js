function sort_filter_entries(entries) {
    return to_array(entries).filter(x => ready(x)).sort((a, b) => vruntime(a) - vruntime(b));
}
function ready(task) {
    return !task.field("Start datetime") || task.field("Start datetime") < Date.now();
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
    return Math.pow(0.8, task.field("Priority")) * task.field("Runtime");
}
pick(entry()).show();
