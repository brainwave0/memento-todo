/// <reference path="./util"/>
/// <reference path="./memento-database"/>

function instant_runoff(lists) {
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
    let last_place_candidate = head(
      head(
        candidate_votes
          .sort((a, b) => a[0].field("randnum") - b[0].field("randnum"))
          .sort((a, b) => a[1] - b[1])
      )
    );
    if (last_place_candidate && first_choices.length > 1) {
      return instant_runoff(
        lists.map((xs) => xs.filter((x) => x != last_place_candidate))
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
