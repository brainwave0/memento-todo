/// <reference path="../memento-database"/>
/// <reference path="../util"/>
/// <reference path="../sort-orders"/>
/// <reference path="../instant-runoff"/>
/// <reference path="./start-stop"/>
function pick_task() {
  let lists: Entry[][] = [];
  for (let fn of sort_orders) {
    lists.push(copy_array(fn(active_tasks())));
  }
  assert(lists.length == 5, "0200B5B8");
  assert(
    lists.every((x) => x.every((y) => typeof y == "object")),
    "EF666F25"
  );
  let task = instant_runoff(lists);
  start(task);
  task.show();
  return task;
}
