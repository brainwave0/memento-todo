/// <reference path="./memento-database"/>

enum SortDir {
  Ascending,
  Descending,
}
function ascending_wait_time(entries: Entry[]): Entry[] {
  return sort(entries, (e) => e.field("Wait time"), SortDir.Descending);
}
function ascending_slack_time(entries: Entry[]): Entry[] {
  return sort(entries, (e) => slack_time(e), SortDir.Ascending);
}
function ascending_expensiveness(entries: Entry[]): Entry[] {
  return sort(entries, (e) => e.field("Expensiveness"), SortDir.Ascending);
}
function descending_importance(entries: Entry[]): Entry[] {
  return sort(entries, (e) => e.field("Importance"), SortDir.Descending);
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
function slack_time(e: Entry) {
  let deadline = e.field("Deadline") || Date.now();
  let expected_runtime = e.field("Expected runtime") || 0;
  return deadline - Date.now() - expected_runtime;
}
var sort_orders = [
  ascending_wait_time,
  ascending_slack_time,
  ascending_expensiveness,
  descending_importance,
];
