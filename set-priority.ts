/// <reference path="./util"/>
/// <reference path="./memento-database"/>
/// <reference path="./util"/>
function adjust_priority(entry: Entry, amount: number): void {
  var all_tasks = get_all_tasks();
  var avg_priority =
    sum(all_tasks.map((x) => x.field("Priority"))) /
    all_tasks.length;

  // Increment the priorities of the selected tasks by the given amount,
  // or do the opposite by decrementing the priorities of the non-selected tasks,
  // so that there is a balance of positive and negative priorities.
  if (avg_priority < 0 && amount < 0 || avg_priority >= 0 && amount > 0) {
    adjust_other(entry, -amount);
  } else if (avg_priority < 0 && amount > 0 || avg_priority >= 0 && amount < 0) {
    entry.set("Priority", entry.field("Priority") + amount);
  }
}
function adjust_other(entry: Entry, amount: number): void {
  get_all_tasks().filter(x => x.id != entry.id).forEach(x => x.set("Priority", x.field("Priority") + amount));
}
