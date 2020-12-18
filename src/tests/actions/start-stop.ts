/// <reference path="../../actions/start-stop"/>
message("testing start-stop");
// start
init_sim();
start();
assert(
  Math.abs(entry().field("Timer start").getTime() - Date.now()) < 1000,
  "test of start failed (1)"
);
assert(entry().field("Running"), "test of start failed (2)");

// finish
init_sim();
let prev_runtime = entry().field("Runtime");
entry().set("Timer start", new Date(Date.now() - 10000000));
finish();
assert(
  Math.abs(entry().field("Runtime") - (prev_runtime + 10000000)) < 1000,
  "test of finish failed (1)"
);
assert(!entry().field("Running"), "test of finish failed (2)");

// elapsed
init_sim();
entry().set("Timer start", new Date(Date.now() - 1024768));
assert(
  Math.abs(
    Date.now() - (entry().field("Timer start").getTime() + 1024768)
  ) < 1000,
  "test of elapsed failed"
);

// start/stop
init_sim();
start_stop();
assert(entry().field("Running"), "test of start_stop failed (1)");
start_stop();
assert(!entry().field("Running"), "test of start_stop failed (2)");
