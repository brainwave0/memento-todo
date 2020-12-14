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
  let heads = lists.map(head);
  let counts_ = counts(heads);
  let min_count = Math.min(...counts_.map(second));
  heads = counts_.filter((x) => x[1] == min_count).map(first);
  let tails = lists.map(tail).filter((x) => x.length > 0);
  while (tails.length > 0 && heads.length > 1) {
    let head_ranks = heads.map((x) => [x, max_rank(x, tails)]).filter((x) => Math.abs(x[1]) != Infinity);
    let ranks = head_ranks.map(second).filter((x) => Math.abs(x) != Infinity);
    let lowest_rank = Math.max(...ranks);
    heads = head_ranks.filter((x) => x[1] == lowest_rank).map(first);
    tails = tails.map(tail).filter((x) => x.length > 0);
  }
  if (heads.length > 0) {
    return random_choice(heads);
  } else {
    return undefined;
  }
}
function rank(x, xs): number {
  return xs.findIndex((y) => y.id == x.id);
}
function ranks(x: any, lists: any[][]): number[] {
  return lists.map((ys) => rank(x, ys));
}
function max_rank(x: any, lists: any[][]): number {
  let result = Math.min(...ranks(x, lists).filter((x) => x >= 0));
  return result;
}
function tail(xs: any[]): any[] {
  return xs.slice(1);
}
function random_choice(xs: any[]): any {
  return xs[Math.round(Math.random() * (xs.length - 1))];
}
