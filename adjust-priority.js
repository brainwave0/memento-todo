function adjust_priorities(amount) {
  var entries = selectedEntries();
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    task.set("Priority", entry.field("Priority") + amount);
  }
}
