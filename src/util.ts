/// <reference path="./memento-database"/>
function to_array(iterable): any[] {
  var result = [];
  for (var i = 0; i < iterable.length; i++) {
    result.push(iterable[i]);
  }
  return result;
}
function ready(task: Entry): boolean {
  return (
    !task.field("Start datetime") || task.field("Start datetime") < Date.now()
  );
}
function active_tasks() {
  return to_array(lib().entries())
    .filter((x) => ready(x));
}
function get_all_tasks() {
  return to_array(lib().entries());
}
function sum(nums: number[]) {
  return nums.reduce((a, b) => a + b, 0);
}
