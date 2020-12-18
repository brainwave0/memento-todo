/// <reference path="./util"/>
/// <reference path="./memento-database"/>

function instant_runoff(lists: any[][]): any {
  lists = lists.filter((x) => x.length > 0);
  let first_choices = lists.map(head);
  let counts_ = counts(first_choices);
  let first_choice_counts = unique(zip(first_choices, counts_), (x) => x[0].id);
  let total_votes = sum(first_choice_counts, second);
  let winner = head(
    head(first_choice_counts.filter((x) => x[1] > total_votes / 2))
  );
  if (winner) {
    return winner;
  } else {
    let loser_ = loser(lists);
    if (loser_ && unique(first_choices, by_id).length > 1) {
      return instant_runoff(
        lists.map((xs) => xs.filter((x) => x.id != loser_.id))
      );
    } else {
      return random_choice(first_choices);
    }
  }
}
function counts(xs) {
  return xs.map((x) => xs.filter((y) => x.id == y.id).length);
}
function head(xs: any[]): any {
  if (xs) {
    return xs[0];
  } else {
    return undefined;
  }
}
function second(pair): any {
  return pair[1];
}
function first(pair): any {
  return pair[0];
}
function print_lists(lists: any[][]): void {
  for (let list of lists) {
    let line = "";
    for (let x of list) {
      line += `${Math.floor(x.field("randnum") * 10000)} `;
    }
    console.log(line);
  }
  console.log();
}
function loser(lists) {
  function loser2(heads, tails) {
    let counts_ = counts(heads);
    let min_count = Math.min(...counts_);
    let losers = unique(
      zip(heads, counts_)
        .filter((x) => x[1] == min_count)
        .map(first),
      by_id
    );

    let ranks = losers.map((x) => max_rank(x, tails)).filter((x) => x != -1);
    let min_rank_ = Math.max(...ranks);
    losers = zip(losers, ranks)
      .filter((x) => x[1] == min_rank_)
      .map(first);

    if (losers.length == 1) {
      return losers[0];
    } else if (empty(tails.filter(not_empty))) {
      return random_choice(heads);
    } else if (losers.length > 1) {
      return loser2(
        losers,
        tails.map((xs) => xs.slice(min_rank_ + 1))
      );
    } else {
      return undefined;
    }
  }
  let heads = lists.map(head);
  let tails = lists.map(tail);
  return loser2(heads, tails);
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
function not_empty(xs) {
  return xs.length > 0;
}
function empty(xs) {
  return xs.length == 0;
}
function zip(...rows) {
  return [...rows[0]].map((_, c) => rows.map((row) => row[c]));
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
function by_id(x) {
  return x.id;
}
