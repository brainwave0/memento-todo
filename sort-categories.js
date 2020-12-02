var SortDir;
(function (SortDir) {
    SortDir[SortDir["Ascending"] = 0] = "Ascending";
    SortDir[SortDir["Descending"] = 1] = "Descending";
})(SortDir || (SortDir = {}));
function ascending_wait_time(entries) {
    return sort(entries, function (e) { return e.field("Wait time"); }, SortDir.Ascending);
}
function ascending_slack_time(entries) {
    return sort(entries, function (e) { return slack_time(e); }, SortDir.Ascending);
}
function ascending_expensiveness(entries) {
    return sort(entries, function (e) { return e.field("Expensiveness"); }, SortDir.Ascending);
}
function descending_importance(entries) {
    return sort(entries, function (e) { return e.field("Importance"); }, SortDir.Descending);
}
function sort(elems, field_selector, sort_direction) {
    if (sort_direction == SortDir.Ascending) {
        return elems.sort(function (a, b) { return field_selector(a) - field_selector(b); });
    }
    else {
        return elems.sort(function (a, b) { return field_selector(b) - field_selector(a); });
    }
}
function slack_time(e) {
    var deadline = e.field("Deadline") || Date.now();
    var expected_runtime = e.field("Expected runtime") || 0;
    return deadline - Date.now() - expected_runtime;
}
var sort_categories = [ascending_wait_time, ascending_slack_time, ascending_expensiveness, descending_importance];
