/// <reference path="./util"/>

function instant_runoff(lists: any[][]): any {
  let first_choices = lists.map(head);
  let candidate_votes = counts(first_choices);
  let total_votes = sum(candidate_votes.map(second));
  let winner = head(
    head(candidate_votes.filter((x) => x[1] > total_votes / 2))
  );
  if (winner) {
    return winner;
  } else {
    let last_place_candidate = shuffleArray(candidate_votes).sort(
      (a, b) => a[1] - b[1]
    )[0][0];
    if (first_choices.length > 0) {
      return instant_runoff(
        lists
          .map((xs) => xs.filter((x) => x != last_place_candidate))
          .filter((x) => x.length > 0)
      );
    } else if (first_choices.length > 0) {
      return first_choices[0];
    } else {
      throw "failed to pick";
    }
  }
}
function counts(xs: any[]): [any, number][] {
  let count_map: [any, number][] = [];
  for (let x of xs) {
    if (count_map.map(head).indexOf(x) > -1) {
      count_map.find((y) => y[0] == x)[1] += 1;
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
