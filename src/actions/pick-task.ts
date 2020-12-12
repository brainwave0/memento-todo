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
  let task = instant_runoff(lists);
  start(task);
  return task;
}
