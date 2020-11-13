function to_array(iterable) {
    var result = [];
    for (var i = 0; i < iterable.length; i++) {
        result.push(iterable[i]);
    }
    return result;
}
function ready(task) {
    return !task.field("Start datetime") || task.field("Start datetime") < Date.now();
}
