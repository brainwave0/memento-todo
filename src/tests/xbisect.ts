/// <reference path="../xbisect"/>
message("testing xbisect")
assert(xbisect(64, true) == 128, "test of xbisect failed (1)");
assert(xbisect(3, false) == 2.5, "test of xbisect failed (2)");
assert(xbisect(64, false) == 48, "test of xbisect failed (3)");
assert(xbisect(90, true) == 91, "test of xbisect failed (4)");
