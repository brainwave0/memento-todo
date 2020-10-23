function increase_priority(task) {
    task.set("Priority", task.field("Priority") + 1);
}

var entries = selectedEntries();
for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    increase_priority(entry);
}
