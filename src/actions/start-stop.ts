/// <reference path="../memento-database"/>
/// <reference path="../util"/>
function start(task): void {
  create_log_entry('Started entry "' + task.field("Name") + '"');
  task.set("Timer start", new Date());
  task.set("Running", true);
}
function finish(): void {
  create_log_entry('Finished entry "' + entry().field("Name") + '"');
  entry().set("Runtime", entry().field("Runtime") + elapsed());
  entry().set("Running", false);
}
function elapsed() {
  return Date.now() - entry().field("Timer start").getTime();
}
function create_log_entry(text: string): void {
  libByName("Log").create({
    Description: text,
    Datetime: new Date(Date.now()),
  });
}
function start_stop() {
  if (entry().field("Running")) {
    finish();
  } else {
    start(entry());
  }
}
