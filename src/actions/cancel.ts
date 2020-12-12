/// <reference path="../memento-database"/>
/// <reference path="../util"/>
function cancel() {
  entry().set("Running", false);
}
