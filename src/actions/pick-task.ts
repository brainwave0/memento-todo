/// <reference path="../memento-database"/>
/// <reference path="../util"/>
/// <reference path="../sort-categories"/>
/// <reference path="../instant-runoff"/>
let lists: Entry[][] = [];
let tasks = active_tasks();
for (let fn of sort_categories) {
    lists.push(fn(tasks));
}
instant_runoff(lists).show();
