/// <reference path="./util"/>
/// <reference path="./memento-database"/>

function instant_runoff(lists: any[][]): any {
  lists = lists.filter((x) => x.length > 0);
  let first_choices = lists.map(head);
  let candidate_votes = counts(first_choices);
  let total_votes = sum(candidate_votes.map(second));
  let winner = head(
    head(candidate_votes.filter((x) => x[1] > total_votes / 2))
  );
  if (winner) {
    return winner;
  } else {
    let loser_ = loser(lists);
    if (loser_ && first_choices.length > 1) {
      return instant_runoff(
        lists.map((xs) => xs.filter((x) => x.id != loser_.id))
      );
    } else if (first_choices.length == 1) {
      return first_choices[0];
    } else {
      throw "failed to pick";
    }
  }
}
function counts(xs: any[]): [any, number][] {
  let count_map: [any, number][] = [];
  for (let x of xs) {
    let index = count_map.map(head).indexOf(x);
    if (index > -1) {
      count_map[index][1] += 1;
    } else {
      count_map.push([x, 1]);
    }
  }
  return count_map;
}
function head(xs: any[]): any {
  if (xs) {
    return xs[0];
  } else {
    return undefined;
  }
}
function second(pair: [any, any]): any {
  return pair[1];
}
function first(pair: [any, any]): any {
  return pair[0];
}
function print_lists(lists: any[][]): void {
  for (let list of lists) {
    Infinity;
    let line = "";
    for (let x of list) {
      line += `${Math.floor(x.field("randnum") * 1000)} `;
    }
    console.log(line);
  }
  console.log();
}
function loser(lists: any[][]): any {
  assert(lists.length > 0, `lists is ${lists}`);
  let heads = lists.map(head);
  assert(heads.length > 0, `heads is initially ${heads}`);
  let counts_ = counts(heads);
  assert(counts_.length > 0, `counts_ is ${counts}`);
  let min_count = Math.min(...counts_.map(second));
  assert(Math.abs(min_count) != Infinity, `min_count is ${min_count}`);
  heads = counts_.filter((x) => x[1] == min_count).map(first);
  assert(heads.length > 0, `heads is ${heads} after initial filtering`);
  let tails = lists.map(tail).filter((x) => x.length > 0);
  assert(tails.length > 0, `tails is initially ${tails}`);
  while (tails.length > 0 && heads.length > 1) {
    let head_ranks = heads.map((x) => [x, max_rank(x, tails)]);
    assert(head_ranks.length > 0, `head_ranks is ${head_ranks}`);
    let ranks = head_ranks.map(second);
    assert(ranks.length > 0, `ranks is ${ranks}`);
    let lowest_rank = Math.max(...ranks);
    assert(Math.abs(lowest_rank) != Infinity, `lowest_rank is ${lowest_rank}`);
    heads = head_ranks.filter((x) => x[1] == lowest_rank).map(first);
    tails = tails.map(tail).filter((x) => x.length > 0);
  }
  if (heads.length > 0) {
    assert(random_choice(heads) != undefined, `random choice is undefined`);
    return random_choice(heads);
  } else {
    return undefined;
  }
}
function rank(x: any, xs: any[][]): number {
  return xs.findIndex((y) => y == x);
}
function ranks(x: any, lists: any[][]): number[] {
  return lists.map((ys) => rank(x, ys));
}
function max_rank(x: any, lists: any[][]): number {
  let result = Math.min(...ranks(x, lists).filter((x) => x >= 0));
  assert(
    result != undefined && Math.abs(result) != Infinity,
    `max_rank returned ${result}`
  );
  return result;
}
function tail(xs: any[]): any[] {
  return xs.slice(1);
}
function random_choice(xs: any[]): any {
  return xs[Math.round(Math.random() * (xs.length - 1))];
}
