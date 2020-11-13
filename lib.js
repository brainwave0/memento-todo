function get_parent(task) {
    var parents = lib().linksTo(task);
    if (parents.length > 0) {
        return parents[0];
    } else {
        return undefined;
    }
}
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
