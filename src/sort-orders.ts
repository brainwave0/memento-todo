/// <reference path="./memento-database"/>
/// <reference path="./util"/>
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
  function value(entries: Entry[]): Entry[] {
    return sort(
      entries.filter((x) => x.field("Value")),
      (e) => e.field("Value"),
      SortDir.Descending
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
  stochastic,
];
function stochastic(entries) {
  let is_member = {};
  let results = [];
  for (let entry of entries) {
    is_member[entry.id] = false;
  }
  for (let i = 0; i < entries.length; i++) {
    let choices = entries.filter((x) => !is_member[x.id]);
    let weights = choices.map((x) => Math.max(1, x.field("Success")));
    let choice = weighted_random_choice(choices, weights);
    is_member[choice.id] = true;
    results.push(choice);
  }
  return results;
}
