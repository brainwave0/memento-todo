/// <reference path="./test-data"/>
/// <reference path="./memento-database"/>
/// <reference path="./util"/>
/// <reference path="./xbisect"/>
/// <reference path="./set-priority"/>
/// <reference path="./instant-runoff"/>
/// <reference path="./actions/start-stop"/>
/// <reference path="./actions/reschedule"/>
/// <reference path="./actions/pick-task"/>
/// <reference path="./actions/increase-priority"/>
/// <reference path="./actions/decrease-priority"/>
/// <reference path="./actions/cancel"/>
function init_sim() {
  current_entry = null;
  library = new Library();
  entries = new Entries();
  args = {};
  for (let obj of test_data) {
    library.create(Object.assign({}, obj));
  }
}
function assert(p: boolean, msg: string): void {
  if (!p) {
    throw msg;
  }
}

////////////////////////////////////////////////////////////////////////////////
// actions                                                                    //
////////////////////////////////////////////////////////////////////////////////

// cancel
init_sim();
current_entry = lib().entries()[0];
start_stop();
cancel();
assert(entry().field("Running") == false, "Failed to cancel running task.");

// decrease priority
init_sim();
let sorted_tasks = sort(
  get_all_tasks(),
  (x) => x.field("Importance"),
  SortDir.Descending
);
current_entry = lib().entries()[Math.floor(lib().entries().length / 2)];
let index = sorted_tasks.findIndex(
  (x) => x.field("Name") == entry().field("Name")
);
decrease_priority();
sorted_tasks = sort(
  get_all_tasks(),
  (x) => x.field("Importance"),
  SortDir.Descending
);
let new_index = sorted_tasks.findIndex(
  (x) => x.field("Name") == entry().field("Name")
);
assert(new_index > index, "Failed to decrease priority.");

// increase priority
init_sim();
sorted_tasks = sort(
  get_all_tasks(),
  (x) => x.field("Importance"),
  SortDir.Descending
);
current_entry = lib().entries()[Math.floor(lib().entries().length / 2)];
index = sorted_tasks.findIndex((x) => Object.is(x, entry()));
increase_priority();
sorted_tasks = sort(
  get_all_tasks(),
  (x) => x.field("Importance"),
  SortDir.Descending
);
assert(
  sorted_tasks.findIndex((x) => Object.is(x, entry())) < index,
  "Failed to increase priority."
);

// pick task
init_sim();
let task = pick_task();
assert(task.field("Name") == "Recreation ", "Picked the wrong task.");
assert(task.field("Running"), "Task didn't automatically start.");

// reschedule with specific datetime
init_sim();
let specific_datetime = new Date(Date.now() + 64 * 60 * 60 * 1000);
args["Specific datetime"] = specific_datetime;
current_entry = lib().entries()[0];
let prev_start = entry().field("Start datetime");
reschedule();
assert(
  entry().field("Start datetime") - prev_start < 365 * 24 * 60 * 60 * 1000,
  "Start datetime set to unexpectedly later date."
);
assert(
  entry().field("Start datetime") - prev_start >= 60 * 1000,
  "Start datetime set to unexpectedly early date."
);
assert(
  entry().field("Start datetime").getTime() === specific_datetime.getTime(),
  "Failed to reschedule using specific datetime."
);
// reschedule with repeat interval
init_sim();
let repeat_interval = 64 * 60 * 60 * 1000;
args["Repeat interval"] = true;
current_entry = lib().entries()[0];
entry().set("Repeat interval", repeat_interval);
prev_start = entry().field("Start datetime");
reschedule();
assert(
  entry().field("Start datetime") - prev_start < 365 * 24 * 60 * 60 * 1000,
  "Start datetime set to unexpectedly later date."
);
assert(
  entry().field("Start datetime") - prev_start >= 60 * 1000,
  "Start datetime set to unexpectedly early date."
);
assert(
  entry().field("Start datetime").getTime() <=
    new Date(Date.now() + repeat_interval).getTime(),
  "Failed to reschedule using repeat interval."
);
// reschedule with and adjust repeat interval
init_sim();
repeat_interval = 64 * 60 * 60 * 1000;
args["Repeat interval"] = true;
args["Adjust repeat interval"] = "Less";
current_entry = lib().entries()[0];
entry().set("Repeat interval", repeat_interval);
prev_start = entry().field("Start datetime");
reschedule();
assert(
  entry().field("Start datetime") - prev_start < 365 * 24 * 60 * 60 * 1000,
  "Start datetime set to unexpectedly later date."
);
assert(
  entry().field("Start datetime") - prev_start >= 60 * 1000,
  "Start datetime set to unexpectedly early date."
);
assert(
  Math.abs(entry().field("Repeat interval") - 48 * 60 * 60 * 1000) < 1000,
  "Failed to reschedule using repeat interval."
);
// reschedule with specific duration
init_sim();
let duration = 64 * 60 * 60 * 1000;
args["Specific duration"] = duration;
current_entry = lib().entries()[0];
prev_start = entry().field("Start datetime");
reschedule();
assert(
  entry().field("Start datetime") - prev_start < 365 * 24 * 60 * 60 * 1000,
  "Start datetime set to unexpectedly later date."
);
assert(
  entry().field("Start datetime") - prev_start >= 60 * 1000,
  "Start datetime set to unexpectedly early date."
);
assert(
  entry().field("Start datetime").getTime() <=
    new Date(Date.now() + duration).getTime(),
  "Failed to reschedule using specific duration."
);

// start/stop
init_sim();
current_entry = lib().entries()[0];
start_stop();
assert(entry().field("Running"), "Failed to start task.");
start_stop();
assert(!entry().field("Running"), "Failed to stop task.");
// start
init_sim();
current_entry = lib().entries()[0];
start(entry());
assert(
  entry().field("Timer start") >= new Date(Date.now()),
  "Failed to set timer start."
);
assert(entry().field("Running"), "Task not running after being started.");
// finish
init_sim();
current_entry = lib().entries()[0];
start(entry());
finish();
assert(!entry().field("Running"), "Task still running after being stopped.");
// toggle running
init_sim();
current_entry = lib().entries()[0];
toggle_running(entry());
assert(entry().field("Running"), "Failed to toggle running state.");
// elapsed
init_sim();
let elapsed_duration = 50 * 60 * 60 * 1000;
current_entry = lib().entries()[0];
entry().set("Timer start", new Date(Date.now() - elapsed_duration));
assert(elapsed() >= elapsed_duration, "Failed to calculate elapsed time.");

////////////////////////////////////////////////////////////////////////////////
// instant runoff                                                             //
////////////////////////////////////////////////////////////////////////////////

// counts
let count_results = counts([4, 4, 2, 4, 1, 3, 5, 5, 2, 3]);
let expected_results = [
  [4, 3],
  [2, 2],
  [1, 1],
  [3, 2],
  [5, 2],
];
if (count_results.length == expected_results.length) {
  for (var i = 0; i < count_results.length; i++) {
    assert(
      count_results[i][0] == expected_results[i][0],
      "Wrong value in count function results."
    );
    assert(
      count_results[i][1] == expected_results[i][1],
      "Wrong count in count function results."
    );
  }
} else {
  console.log("Count function return value is the wrong length.");
}

// head
assert(head([1, 2]) == 1, "head failed");
assert(head([]) === undefined, "head didn't return undefined");

// second
assert(second([1, 3]) == 3, "second failed");

////////////////////////////////////////////////////////////////////////////////
// set priority                                                               //
////////////////////////////////////////////////////////////////////////////////

// adjust_priority
init_sim();
current_entry = lib().entries()[0];
adjust_priority(1);
assert(entry().field("Importance") == 0, "set priority failed (4)");
assert(average_priority() == -0.90625, "set priority failed (1)");
init_sim();
current_entry = lib().entries()[0];
adjust_priority(-1);
assert(entry().field("Importance") == -1, "set priority failed (3)");
assert(average_priority() == 0.03125, "set priority failed (2)");
// adjust_other
init_sim();
current_entry = lib().entries()[0];
adjust_other(entry(), -2);
assert(Math.floor(average_priority() * 1000) == -2875, "adjust_other failed");
// average_priority
init_sim();
assert(average_priority() == -0.9375, "average_priority failed");

////////////////////////////////////////////////////////////////////////////////
// util                                                                       //
////////////////////////////////////////////////////////////////////////////////

// to_array
init_sim();
assert(
  Array.isArray(to_array(lib().entries())),
  "to_array didn't make an array."
);

// ready
init_sim();
let e = lib().entries()[0];
e.set("Start datetime", null);
assert(ready(e), "ready doesn't work on null start datetimes");
e.set("Start datetime", new Date(Date.now()));
assert(ready(e), "ready doesn't work on current datetime");

// sum
assert(sum([1, 2, 3]) == 6, "sum failed");
let arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
shuffle_array(arr1);
assert(!arr1.every((a, i) => a === arr2[i]), "shuffle_array failed");

// sort
let arr = [7, 6, 8, 5, 9];
let expected = [5, 6, 7, 8, 9];
assert(
  sort(arr, (x) => x, SortDir.Ascending).every((arr, i) => arr === expected[i]),
  "ascending sort failed"
);
arr = [7, 6, 8, 5, 9];
expected = [9, 8, 7, 6, 5];
assert(
  sort(arr, (x) => x, SortDir.Descending).every(
    (arr, i) => arr === expected[i]
  ),
  "descending sort failed"
);

// copy_array
let a = [8, 7, 6, 5, 4, 3, 0, 9];
let b = copy_array(a);
shuffle_array(a);
assert(!a.every((x, i) => x === b[i]), "copy_array failed");

////////////////////////////////////////////////////////////////////////////////
// xbisect                                                                    //
////////////////////////////////////////////////////////////////////////////////

assert(xbisect(38, true) == 39, "xbisect failed (1)");
assert(xbisect(25, false) == 24.5, "xbisect failed (2)");
assert(xbisect(51, true) == 51.5, "xbisect failed (3)");
assert(xbisect(75, false) == 74.5, "xbisect failed (4)");
assert(xbisect(64, true) == 128, "xbisect failed (5)");
assert(xbisect(64, false) == 48, "xbisect failed (6)");

console.log("tests complete")
