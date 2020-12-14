/// <reference path="./util"/>
/// <reference path="./memento-database"/>

function instant_runoff(lists) {
  print_lists(lists)
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
function print_lists(lists) {
  for (let list of lists) {
    let line = "";
    for (let x of list) {
      line += `${Math.floor(x.field("randnum") * 1000)} `;
    }
    console.log(line);
  }
  console.log();
}
function loser(lists) {
  let heads = lists.map(head);
  let counts_ = counts(heads);
  let min_count = Math.min(...counts_.map(second));
  heads = counts_.filter((x) => x[1] == min_count).map(first);
  let tails = lists;
  while (tails.length > 0) {
    tails = tails.map(tail).filter((x) => x.length > 0);
    let head_ranks = heads.map((x) => [x, max_rank(x, tails)]);
    let ranks = head_ranks.map(second);
    let lowest_rank = Math.max(...ranks);
    heads = head_ranks.filter((x) => x[1] == lowest_rank).map(first);
    if (heads.length == 1) {
      return heads[0];
    }
  }
  return undefined;
}
function rank(x, xs) {
  return xs.findIndex((y) => y.id == x.id);
}
function ranks(x, lists) {
  return lists.map((ys) => rank(x, ys));
}
function max_rank(x, lists) {
  return Math.min(...ranks(x, lists).filter((x) => x >= 0));
}
function tail(xs) {
  return xs.slice(1);
}
