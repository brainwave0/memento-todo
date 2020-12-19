/// <reference path="../../actions/finish"/>
/// <reference path="../../actions/start"/>
// finish
init_sim();
let prev_runtime = entry().field("Runtime");
start(entry())
entry().set("Timer start", new Date(Date.now() - 10000000));
finish();
assert(
  Math.abs(entry().field("Runtime") - (prev_runtime + 10000000)) < 1000,
  "test of finish failed (1)"
);
assert(!entry().field("Running"), "test of finish failed (2)");
