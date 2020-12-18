message("testing cancel")
init_sim();
entry().set("Running", false);
assert(entry().field("Running") == false, "test of cancel failed");
