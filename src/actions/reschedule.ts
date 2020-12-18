/// <reference path="../memento-database"/>
/// <reference path="../util"/>
/// <reference path="../xbisect"/>
function reschedule() {
  if (arg("Adjust repeat interval") == "Less") {
    bisect_repeat_interval(false);
  } else if (arg("Adjust repeat interval") == "More") {
    bisect_repeat_interval(true);
  }
  if (arg("Specific datetime")) {
    entry().set("Start datetime", arg("Specific datetime"));
  } else if (arg("Repeat Interval")) {
    entry().set(
      "Start datetime",
      new Date(Date.now() + entry().field("Repeat Interval"))
    );
  } else if (arg("Specific duration")) {
    entry().set(
      "Start datetime",
      new Date(Date.now() + arg("Specific duration"))
    );
  }
}
function bisect_repeat_interval(more) {
  entry().set(
    "Repeat Interval",
    xbisect(entry().field("Repeat Interval") / 1000 / 60 / 60, more) *
      1000 *
      60 *
      60
  );
}
