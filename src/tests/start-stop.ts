/// <reference path="../start-stop"/>
message("testing start-stop");
// elapsed
init_sim();
entry().set("Timer start", new Date(Date.now() - 1024768));
assert(
  Math.abs(
    Date.now() - (entry().field("Timer start").getTime() + 1024768)
  ) < 1000,
  "test of elapsed failed"
);
