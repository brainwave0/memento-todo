/// <reference path="../start-stop"/>
function finish(): void {
  assert(entry().field("Running"), "task isn't running");
  create_log_entry('Finished entry "' + entry().field("Name") + '"');
  entry().set("Runtime", entry().field("Runtime") + elapsed());
  entry().set("Success", entry().field("Success") + (arg("Success") ? 1 : -1));
  entry().set("Running", false);
}
