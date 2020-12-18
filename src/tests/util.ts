/// <reference path="./test-data"/>
message("testing util")
// to array
init_sim();
let entries_array = to_array(lib().entries());
assert(Array.isArray(entries_array), "test of to_array failed");
assert(entries_array.length == 31, "test of to_array failed");

// ready
init_sim();
entry().set("Start datetime", new Date());
assert(ready(entry()), "test of ready failed (1)");
entry().set("Start datetime", new Date(Date.now() + 60 * 60 * 1000));
assert(!ready(entry()), "test of ready failed (2)");

// active tasks
init_sim();
assert(
  active_tasks().every((x) => ready(x)),
  "test of active_tasks failed"
);

// get all tasks
assert(
  get_all_tasks().length == test_data.length,
  "test of get_all_tasks failed"
);

// sum
assert(sum([5, 4, 8, 7, 6]) == 30, "test of sum failed (1)");
assert(
  sum(
    [
      [1, 2],
      [2, 4],
      [5, 6],
      [7, 8],
    ],
    second
  ) == 20,
  "test of sum failed (2)"
);

// shuffle array
let rand_array = [];
for (let i = 0; i < 99; i++) {
  rand_array.push(Math.random());
}
let shuffled = copy_array(rand_array);
shuffle_array(rand_array);
assert(!array_equals(rand_array, shuffled), "test of shuffle_array failed");

// sort
assert(
  array_equals2(
    sort(
      [
        [1, 2],
        [3, 4],
        [5, 6],
      ],
      first,
      SortDir.Descending
    ),
    [
      [5, 6],
      [3, 4],
      [1, 2],
    ]
  ),
  "test of sort failed"
);

// copy array
let original_array = [4, 4, 4, 4];
assert(
  copy_array(original_array) != original_array,
  "test of copy_array failed"
);

// array_equals2
assert(
  array_equals2(
    [
      [8, 7],
      [6, 5],
      [4, 3],
    ],
    [
      [8, 7],
      [6, 5],
      [4, 3],
    ]
  ),
  "test of array_equals2 failed"
);

// array_equals
assert(!array_equals([1, 1, 1], [2, 2, 2]), "test of array_equals failed (1)");
assert(array_equals([1, 1, 1], [1, 1, 1]), "test of array_equals failed (2)");
