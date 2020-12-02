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
