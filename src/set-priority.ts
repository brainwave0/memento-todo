/// <reference path="./util"/>
/// <reference path="./memento-database"/>
function adjust_priority(amount: number): void {
  let avg_priority = average_priority();
  // Increment the priorities of the selected tasks by the given amount,
  // or do the opposite by decrementing the priorities of the non-selected tasks,
  // so that there is a balance of positive and negative priorities.
  if ((avg_priority < 0 && amount < 0) || (avg_priority >= 0 && amount > 0)) {
    adjust_other(entry(), -amount);
  } else if (
    (avg_priority < 0 && amount > 0) ||
    (avg_priority >= 0 && amount < 0)
  ) {
    entry().set("Importance", entry().field("Importance") + amount);
  }
}
function adjust_other(entry: Entry, amount: number): void {
  get_all_tasks()
    .filter((x) => x.id != entry.id)
    .forEach((x) => x.set("Importance", x.field("Importance") + amount));
}
function average_priority() {
  var all_tasks = get_all_tasks();
  return sum(all_tasks.map((x) => x.field("Importance"))) / all_tasks.length;
}
