/// <reference path="../memento-database"/>
/// <reference path="../util"/>
/// <reference path="../sort-orders"/>
/// <reference path="../instant-runoff"/>
let lists: Entry[][] = [];
let tasks = shuffleArray(active_tasks());
for (let fn of sort_orders) {
  lists.push(fn(tasks));
}
instant_runoff(lists).show();
