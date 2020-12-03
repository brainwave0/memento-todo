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
  return to_array(lib().entries()).filter((x) => ready(x));
}
function get_all_tasks() {
  return to_array(lib().entries());
}
function sum(nums: number[]) {
  return nums.reduce((a, b) => a + b, 0);
}
function shuffleArray(array: any[]): any[] {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
