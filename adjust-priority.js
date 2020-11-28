function includes(item, array) {
  return array.find((x) => x.id == item.id) !== undefined;
}
function adjust_priorities(amount) {
  var all_tasks = get_all_tasks();
  var avg_priority =
    all_tasks.map((x) => x.field("Priority")).reduce((a, b) => a + b, 0) /
    all_tasks.length;

  // Increment the priorities of the selected tasks by the given amount,
  // or do the opposite by decrementing the priorities of the non-selected tasks,
  // so that there is a balance of positive and negative priorities.
  if (avg_priority < 0 && amount < 0) {
    adjust_other(-amount);
  } else if (avg_priority < 0 && amount > 0) {
    adjust_selected(amount);
  } else if (avg_priority >= 0 && amount < 0) {
    adjust_selected(amount);
  } else if (avg_priority >= 0 && amount > 0) {
    adjust_other(-amount);
  }
}
function adjust_selected(amount) {
  to_array(selectedEntries()).forEach((x) =>
    x.set("Priority", x.field("Priority") + amount)
  );
}
function adjust_other(amount) {
  get_all_tasks().forEach((x) => {
    if (!includes(x, to_array(selectedEntries()))) {
      x.set("Priority", x.field("Priority") + amount);
    }
  });
}
