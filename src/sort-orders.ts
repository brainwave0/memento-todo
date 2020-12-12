/// <reference path="./memento-database"/>
var sort_orders = [
  function randnum(entries) {
    return sort(entries, (e) => e.field("randnum"), SortDir.Ascending);
  },
  function latest_attempt(entries: Entry[]): Entry[] {
    return sort(
      entries,
      (e) => e.field("Latest attempt") || new Date(0),
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
  function runtime(entries: Entry[]): Entry[] {
    return sort(entries, (e) => e.field("Runtime"), SortDir.Ascending);
  },
];
