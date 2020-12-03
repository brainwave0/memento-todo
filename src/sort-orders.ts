/// <reference path="./memento-database"/>

enum SortDir {
  Ascending,
  Descending,
}
function latest_attempt(entries: Entry[]): Entry[] {
  return sort(entries, (e) => e.field("Latest attempt"), SortDir.Ascending);
}
function start_datetime(entries: Entry[]): Entry[] {
  return sort(entries, (e) => e.field("Start datetime"), SortDir.Ascending);
}
function deadline(entries: Entry[]): Entry[] {
  return sort(entries, (e) => e.field("Deadline"), SortDir.Ascending);
}
function value(entries: Entry[]): Entry[] {
  return sort(entries, (e) => e.field("Value"), SortDir.Descending);
}
function importance(entries: Entry[]): Entry[] {
  return sort(entries, (e) => e.field("Importance"), SortDir.Descending);
}
function remaining_runtime(entries: Entry[]): Entry[] {
  return sort(
    entries,
    (e) => e.field("Expected runtime") - e.field("Runtime"),
    SortDir.Ascending
  );
}
function runtime(entries: Entry[]): Entry[] {
  return sort(entries, (e) => e.field("Runtime"), SortDir.Ascending);
}
function sort(
  elems: any[],
  field_selector: (x: any) => any,
  sort_direction: SortDir
) {
  if (sort_direction == SortDir.Ascending) {
    return elems.sort((a, b) => field_selector(a) - field_selector(b));
  } else {
    return elems.sort((a, b) => field_selector(b) - field_selector(a));
  }
}
var sort_orders = [
  latest_attempt,
  start_datetime,
  deadline,
  value,
  importance,
  remaining_runtime,
  runtime,
];
