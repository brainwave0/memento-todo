/// <reference path="../start-stop"/>
function start(task): void {
  assert(!entry().field("Running"), "task is already running");
  create_log_entry('Started entry "' + task.field("Name") + '"');
  task.set("Timer start", new Date());
  task.set("Running", true);
}
