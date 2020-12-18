/// <reference path="../instant-runoff"/>
/// <reference path="../util"/>
message("testing instant-runoff");
// instant runoff
let numberss = [];
for (let i = 0; i < 5; i++) {
  numberss.push([]);
  for (let j = 0; j < 32; j++) {
    numberss[i].push(Math.floor(Math.random() * 100000000));
  }
}
function score(lists, pick) {
  let score = 0;
  for (let list of lists) {
    score += list.length - list.indexOf(pick) - list.length / 2;
  }
  return score;
}
assert(
  score(numberss, instant_runoff(numberss)) > 0,
  "test of instant runoff failed"
);

// counts
let numbers = [8, 10, 8, 1, 2, 4, 3, 2, 3, 5].map((x) => ({ id: x }));
let expected = [2, 1, 2, 1, 2, 1, 2, 2, 2, 1];
assert(
  array_equals(counts(numbers), expected),
  `test of counts failed --- ${counts(numbers)} != ${expected}`
);

// head
assert(head([1, 2, 3, 2, 1]) == 1, "test of head failed (1)");
assert(head([]) == undefined, "test of head failed (2)");

// second
assert(second([2, 3]) == 3, "test of second failed");

// first
assert(first([2, 3]) == 2, "test of first failed");

// loser
lists = [
  [
    3,
    10,
    8,
    13,
    29,
    4,
    11,
    14,
    29,
    25,
    31,
    9,
    16,
    20,
    5,
    21,
    29,
    10,
    31,
    21,
    30,
    1,
    2,
    5,
    3,
    19,
    25,
    8,
    22,
    22,
    23,
    16,
  ],
  [
    22,
    23,
    28,
    3,
    13,
    7,
    4,
    31,
    14,
    32,
    27,
    25,
    14,
    17,
    6,
    30,
    11,
    4,
    5,
    3,
    26,
    13,
    8,
    13,
    32,
    22,
    29,
    22,
    28,
    16,
    22,
    27,
  ],
  [
    3,
    19,
    30,
    18,
    3,
    17,
    11,
    29,
    15,
    31,
    19,
    27,
    14,
    10,
    2,
    13,
    19,
    16,
    1,
    31,
    11,
    26,
    32,
    12,
    13,
    18,
    2,
    18,
    15,
    23,
    9,
  ],
  [
    25,
    23,
    23,
    25,
    12,
    16,
    29,
    7,
    26,
    7,
    13,
    13,
    16,
    29,
    4,
    23,
    10,
    22,
    17,
    5,
    15,
    7,
    8,
    27,
    3,
    2,
    2,
    23,
    32,
    4,
    7,
  ],
  [
    30,
    20,
    22,
    27,
    14,
    23,
    13,
    1,
    22,
    6,
    26,
    24,
    26,
    14,
    11,
    21,
    14,
    13,
    8,
    4,
    26,
    24,
    12,
    16,
    5,
    23,
    20,
    9,
    9,
    29,
    30,
  ],
].map((xs) => xs.map((x) => ({ id: x })));
assert(loser(lists).id == 25, `test of loser failed --- 25 != ${loser(lists).id}`);

// rank
init_sim();
assert(
  rank(lib().entries()[5], to_array(lib().entries())) == 5,
  "test of rank failed"
);

// ranks
assert(
  array_equals(ranks({id:16}, lists), [12, 29, 17, 5, 23]),
  `test of ranks failed --- [${ranks(16, lists)}] != [12, 29, 17, 5, 23]`
);

// max rank
assert(max_rank({id:16}, lists) == 5, "test of max rank failed");

// tail
assert(
  array_equals(tail([5, 4, 3, 2, 2, 1]), [4, 3, 2, 2, 1]),
  "test of tail failed"
);

// random choice
for (let i = 0; i < 10; i++) {
  let choice = random_choice([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assert(0 <= choice && choice <= 9, "test of random choice failed");
}

// not empty
assert(not_empty([]) == false, "test of not empty failed (1)");
assert(not_empty([1]) == true, "test of not empty failed (2)");

// empty
assert(empty([]) == true, "test of empty failed (1)");
assert(empty([2]) == false, "test of empty failed (2)");

// zip
let as = [1, 2, 3, 4, 5];
let bs = [5, 4, 3, 2, 1];
let zipped = zip(as, bs);
assert(zipped.length == as.length, "test of zip failed (1)");
for (let i = 0; i < as.length; i++) {
  assert(as[i][0] == bs[i][0], "test of zip failed (2)");
  assert(as[i][1] == bs[i][1], "test of zip failed (3)");
}

// unique
let dups = [3, 8, 2, 9, 7, 7, 8, 1, 8, 3];
assert(array_equals(unique(dups), [3, 8, 2, 9, 7, 1]), "test of unique failed");

// by id
init_sim();
assert(by_id(lib().entries()[0]) == 0, "test of by_id failed");
