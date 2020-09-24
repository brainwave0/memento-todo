function get_parent(task) {
    var parents = lib().linksTo(task);
    if (parents.length > 0) {
        return parents[0];
    } else {
        return undefined;
    }
}
