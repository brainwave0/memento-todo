/// <reference path="../util"/>
/// <reference path="../memento-database"/>
function set_priority() {
  entry().set("Importance", arg("Importance"));
  let delta = average_priority();
  for (let a of get_all_tasks()) {
    a.set("Importance", a.field("Importance") - delta);
  }
}
