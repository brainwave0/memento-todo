/// <reference path="./test-data"/>
message("testing util");
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

// random choice
init_sim();
let all_tasks = get_all_tasks();
let occurrences = all_tasks.map((x) => 0);
for (let i = 0; i < 1000; i++) {
  occurrences[
    weighted_random_choice(
      all_tasks,
      all_tasks.map((x) => x.id)
    )
  ] += 1;
}
assert(
  Math.max(...occurrences) == occurrences[occurrences.length - 1],
  "test of random choice failed"
);

// find closest index
let index = find_closest_index([1, 2, 3, 4, 5], 2.5);
assert(index == 2 || index == 3, "test of find_closest_index failed");

// unique
let dups = [3, 8, 2, 9, 7, 7, 8, 1, 8, 3];
assert(array_equals(unique(dups), [3, 8, 2, 9, 7, 1]), "test of unique failed");
