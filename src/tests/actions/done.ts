/// <reference path="../../actions/done"/>
message("testing done")
init_sim();
set_done();
assert(entry().field("Runtime") == 0, "test of done failed");
