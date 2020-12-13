/// <reference path="./memento-database"/>
var sort_orders = [
  function start_datetime(entries: Entry[]): Entry[] {
    return sort(
      entries,
      (e) => e.field("Start datetime") || new Date(0),
      SortDir.Ascending
    );
  },
  function deadline(entries: Entry[]): Entry[] {
    return sort(
      entries,
      (e) => e.field("Deadline") || new Date(0),
      SortDir.Ascending
    );
  },
  function value(entries: Entry[]): Entry[] {
    return sort(
      entries,
      (e) => e.field("Value") / e.field("Total runtime") || 1,
      SortDir.Descending
    );
  },
  function importance(entries: Entry[]): Entry[] {
    return sort(entries, (e) => e.field("Importance"), SortDir.Descending);
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
];
