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
    !task.field("Start datetime") ||
    task.field("Start datetime").getTime() <= Date.now()
  );
}
function active_tasks() {
  return to_array(lib().entries()).filter((x) => ready(x));
}
function get_all_tasks() {
  return to_array(lib().entries());
}
function sum(nums, f = id) {
  return nums.map(f).reduce((a, b) => a + b, 0);
}
function shuffle_array(array: any[]): any[] {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
enum SortDir {
  Ascending,
  Descending,
}
function sort(
  elems: any[],
  field_selector: (x: any) => any,
  sort_direction: SortDir
) {
  if (sort_direction == SortDir.Ascending) {
    return elems.sort((a, b) => field_selector(a) - field_selector(b));
  } else {
    return elems.sort((a, b) => field_selector(b) - field_selector(a));
  }
}
function copy_array(xs) {
  let result = [];
  for (let x of xs) {
    result.push(x);
  }
  return result;
}
function assert(p: boolean, msg: string): void {
  if (!p) {
    throw msg;
  }
}
function id(x) {
  return x;
}
function array_equals2(ass, bss) {
  if (ass.length != bss.length) {
    return false;
  }
  for (let i = 0; i < ass.length; i++) {
    if (!array_equals(ass[i], bss[i])) {
      return false;
    }
  }
  return true;
}
function array_equals(as, bs) {
  if (as.length != bs.length) {
    return false;
  }
  for (let i = 0; i < as.length; i++) {
    if (as[i] != bs[i]) {
      return false;
    }
  }
  return true;
}
function random_choice(xs: any[]): any {
  return xs[Math.round(Math.random() * (xs.length - 1))];
}
function average_priority() {
  var all_tasks = get_all_tasks();
  return sum(all_tasks.map((x) => x.field("Importance"))) / all_tasks.length;
}
function weighted_random_choice(choices, weights) {
  let sum_weights = 0;
  let cdf = [];
  for (let weight of weights) {
    sum_weights += weight;
    cdf.push(weight / sum_weights);
  }
  return choices[find_closest_index(weights, Math.random())];
}
function find_closest_index(array, target) {
  let delta = array.length - 1;
  let index = delta;
  while (delta > 0) {
    delta = delta / 2;
    if (array[index] > target) {
      index = Math.round(index - delta);
    } else if (array[index] < target) {
      index = Math.round(index + delta);
    } else {
      break;
    }
  }
  return index;
}
function unique(xs, f = id) {
  let results = [];
  for (let x of xs) {
    if (results.map(f).indexOf(f(x)) == -1) {
      results.push(x);
    }
  }
  return results;
}
