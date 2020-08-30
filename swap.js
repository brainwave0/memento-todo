var up = false;
function midpointVruntime(a, b) {
    return (vruntime(a) + vruntime(b)) / 2
}
function vruntime(entry) {
    return entry.field("Priority") * entry.field("Runtime");
}
var a = selectedEntries()[0];
var b = selectedEntries()[1];
var c = selectedEntries()[2];
if (up) {
    c.set("Priority", midpointVruntime(a, b) / c.field("Runtime"));
} else {
    a.set("Priority", midpointVruntime(b, c) / a.field("Runtime"));
}