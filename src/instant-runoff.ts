/// <reference path="./util"/>
/// <reference path="./memento-database"/>

function instant_runoff(lists: any[][]): any {
  lists = lists.filter((x) => x.length > 0);
  assert(lists.length > 0, "7B09FEFA");
  let first_choices = lists.map(head);
  assert(
    first_choices.every((x) => typeof x == "object"),
    "125F6295"
  );
  let candidate_votes = counts(first_choices);
  assert(candidate_votes.length > 0, "A781115C");
  assert(
    candidate_votes.every((x) => typeof x[0] == "object"),
    "3443E68C"
  );
  assert(
    candidate_votes.every((x) => typeof x[1] == "number"),
    "CA36E6A1"
  );
  let total_votes = sum(candidate_votes.map(second));
  assert(total_votes > 0, "970077C7");
  let winner = head(
    head(candidate_votes.filter((x) => x[1] > total_votes / 2))
  );
  if (winner) {
    return winner;
  } else {
    let loser_ = loser(lists);
    assert(loser_ != undefined, "DE2B3572");
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
  assert(heads.length > 0, "B8AD85DF");
  assert(
    heads.every((x) => typeof x == "object"),
    "E23D0FAC"
  );
  let counts_ = counts(heads);
  let min_count = Math.min(...counts_.map(second));
  assert(min_count > 0, "58A3FAC7");
  heads = counts_.filter((x) => x[1] == min_count).map(first);
  assert(heads.length > 0, "405DA2F3");
  let tails = lists.map(tail).filter((x) => x.length > 0);
  assert(tails.length > 0, "C75252D3");
  while (tails.length > 0 && heads.length > 1) {
    let head_ranks = heads
      .map((x) => [x, max_rank(x, tails)])
      .filter((x) => Math.abs(x[1]) != Infinity);
    assert(
      head_ranks.every((x) => typeof x[0] == "object"),
      "017A30F1"
    );
    assert(
      head_ranks.every((x) => typeof x[1] == "number"),
      "2A2BA251"
    );
    let ranks = head_ranks.map(second).filter((x) => Math.abs(x) != Infinity);
    assert(ranks.length > 0, "08488931");
    assert(
      ranks.every((x) => typeof x == "number"),
      "09CC8F9B"
    );
    let lowest_rank = Math.max(...ranks);
    assert(typeof lowest_rank == "number", "C6E13E0F");
    assert(Math.abs(lowest_rank) != Infinity, "31F01CC1");
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
