function includes(item, array) {
  return array.find((x) => x.id == item.id) !== undefined;
}
function adjust_priorities(amount) {
  var all_tasks = get_all_tasks();
  var avg_priority =
    all_tasks.map((x) => x.field("Priority")).reduce((a, b) => a + b, 0) /
    all_tasks.length;
  var selected_tasks = to_array(selectedEntries());

  // Increment the priorities of the selected tasks by the given amount,
  // or do the opposite by decrementing the priorities of the non-selected tasks,
  // so that there is a balance of positive and negative priorities.
  if (avg_priority >= 0) {
    selected_tasks.forEach((x) =>
      x.set("Priority", x.field("Priority") + amount)
    );
  } else {
    all_tasks.forEach((x) => {
      if (!includes(selected_tasks, x)) {
        x.set("Priority", x.field("Priority") - amount);
      }
    });
  }
}
