/// <reference path="../memento-database"/>
/// <reference path="../util"/>
function reschedule() {
  if (arg("Specific datetime")) {
    entry().set("Start datetime", arg("Specific datetime"));
  } else if (arg("Repeat interval")) {
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
  entry().set("Runtime", 0);
}
