/// <reference path="../../actions/start"/>
// start
init_sim();
start(entry());
assert(
  Math.abs(entry().field("Timer start").getTime() - Date.now()) < 1000,
  "test of start failed (1)"
);
assert(entry().field("Running"), "test of start failed (2)");
