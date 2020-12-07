/// <reference path="../memento-database"/>
/// <reference path="../util"/>
/// <reference path="../sort-orders"/>
/// <reference path="../instant-runoff"/>
let lists: Entry[][] = [];
for (let fn of sort_orders) {
  lists.push(fn(shuffleArray(active_tasks())));
}
instant_runoff(lists).show();
