/// <reference path="../../actions/reschedule"/>
message("testing reschedule");
function test_adjust_repeat_interval(which) {
  init_sim();
  let prev_repeat_interval = entry().field("Repeat Interval");
  args["Repeat Interval"] = true;
  args["Adjust repeat interval"] = which;
  reschedule();
  if (which == "Less") {
    assert(
      entry().field("Repeat Interval") < prev_repeat_interval,
      `test of reschedule failed (5) --- ${entry().field("Repeat Interval")} !< ${prev_repeat_interval}`
    );
  } else {
    assert(
      entry().field("Repeat Interval") > prev_repeat_interval,
      "test of reschedule failed (6)"
    );
  }
}
////////////////
// reschedule //
////////////////
message("testing reschedule");

// increase repeat interval
message("testing increase repeat interval");
test_adjust_repeat_interval("More");

// decrease repeat interval
message("testing decrease repeat interval");
test_adjust_repeat_interval("Less");

// specific datetime
message("testing specific datetime");
init_sim();
let new_date = new Date(Date.now() + 24 * 60 * 60 * 1000);
args["Specific datetime"] = new Date(Date.now() + 24 * 60 * 60 * 1000);
reschedule();
assert(
  entry().field("Start datetime").getTime() - new_date.getTime() < 1000,
  "test of reschedule failed (1)"
);

// repeat interval
message("testing repeat interval");
init_sim();
args["Repeat Interval"] = true;
reschedule();
assert(
  entry().field("Start datetime").getTime() -
    new Date(Date.now() + entry().field("Repeat Interval")).getTime() <
    1000,
  `test of reschedule failed (2) --- ${entry()
    .field("Start datetime")
    .getTime()} != ${new Date(
    Date.now() + entry().field("Repeat Interval")
  ).getTime()}`
);

// specific duration
message("testing specific duration");
init_sim();
let duration = (60 * 60 + 20) * 1000;
args["Specific duration"] = duration;
reschedule();
assert(
  entry().field("Start datetime").getTime() -
    new Date(Date.now() + duration).getTime() <
    1000,
  "test of reschedule failed (3)"
);

////////////////////////////
// bisect repeat interval //
////////////////////////////
message("testing bisect repeat interval");

// more
message("testing more");
init_sim();
entry().set("Repeat Interval", 60 * 60 * 1000);
bisect_repeat_interval(true);
assert(
  entry().field("Repeat Interval") == 2 * 60 * 60 * 1000,
  "test of bisect repeat interval failed (1)"
);

// less
init_sim();
entry().set("Repeat Interval", 60 * 60 * 1000);
bisect_repeat_interval(false);
assert(
  entry().field("Repeat Interval") == 30 * 60 * 1000,
  `test of bisect repeat interval failed (2) --- ${entry().field("Repeat Interval")} != ${30 * 60 * 1000}`
);
