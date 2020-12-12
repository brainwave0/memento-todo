/// <reference path="../android-alarm"/>
/// <reference path="../memento-database"/>
/// <reference path="../settings"/>
/// <reference path="../util"/>

function start(): void {
  create_log_entry('Started entry "' + entry().field("Name") + '"');
  entry().set("Timer start", new Date(Date.now()));
  toggle_running();
}
function finish(): void {
  create_log_entry('Finished entry "' + entry().field("Name") + '"');
  entry().set("Runtime", entry().field("Runtime") + elapsed());
  entry().set("Total runtime", entry().field("Total runtime") + elapsed());
  entry().set("Value", entry().field("Value") + arg("Rating"));
  entry().set("Latest attempt", new Date(Date.now()));
  toggle_running();
}
function set_timer() {
  AndroidAlarm.timer(timer_duration, entry().field("Name"), false);
}
function toggle_running() {
  entry().set("Running", !entry().field("Running"));
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
    start();
  }
}
