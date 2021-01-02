/// <reference path="./memento-database.ts"/>
/// <reference path="./util.ts"/>
var sort_orders = [
  function start_datetime(entries: Entry[]): Entry[] {
    return sort(entries, (e) => e.field("Start datetime"), SortDir.Ascending);
  },
  function deadline(entries: Entry[]): Entry[] {
    return sort(
      entries.filter((x) => x.field("Deadline")),
      (e) => e.field("Deadline"),
      SortDir.Ascending
    );
  },
  function time_per_day(entries: Entry[]): Entry[] {
    return sort(
      entries.filter((x) => x.field("Time per day")),
      (e) => e.field("Time per day"),
      SortDir.Ascending
    );
  },
  function successfulness(entries: Entry[]): Entry[] {
    return sort(entries, (e) => e.field("Success"), SortDir.Descending);
  },
  function importance(entries: Entry[]): Entry[] {
    return sort(
      entries.filter((x) => x.field("Importance")),
      (e) => e.field("Importance"),
      SortDir.Descending
    );
  },
  function remaining_runtime(entries: Entry[]): Entry[] {
    return sort(
      entries,
      (e) =>
        e.field("Expected runtime")
          ? e.field("Expected runtime") - e.field("Runtime")
          : e.field("Runtime"),
      SortDir.Ascending
    );
  },
  function random(entries) {
    return shuffle_array(entries);
  },
];
