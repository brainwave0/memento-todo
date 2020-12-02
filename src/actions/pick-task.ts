/// <reference path="../sort-categories"/>
/// <reference path="../util"/>
/// <reference path="../instant-runoff"/>
/// <reference path="../memento-database"/>
let lists: Entry[][] = [];
let all_tasks = get_all_tasks();
for (let fn of sort_categories) {
    lists.push(fn(all_tasks));
}
instant_runoff(lists).show();
