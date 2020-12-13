/// <reference path="./memento-database"/>
var sort_orders = [
  function start_datetime(entries: Entry[]): Entry[] {
    return sort(entries, (e) => e.field("Start datetime"), SortDir.Ascending);
  },
  function deadline(entries: Entry[]): Entry[] {
    return sort(
      entries.filter((x) => !x.field("Deadline")),
      (e) => e.field("Deadline"),
      SortDir.Ascending
    );
  },
  function value(entries: Entry[]): Entry[] {
    return sort(
      entries.filter((x) => !x.field("Total runtime")),
      (e) => e.field("Value") / e.field("Total runtime"),
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
