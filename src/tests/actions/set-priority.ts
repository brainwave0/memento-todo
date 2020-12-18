/// <reference path="../../util"/>
/// <reference path="../../actions/set-priority"/>
message("testing set-priority");
function sort_priority(xs) {
  return sort(xs, (x) => x.field("Importance"), SortDir.Descending);
}
function test_inc_dec_priority(which) {
  init_sim();
  let entries = sort_priority(get_all_tasks());
  let prev_rank = rank(entry(), entries);
  if (which == "increase") {
    args["Importance"] = entry().field("Importance") + 1;
    set_priority();
    let new_rank = rank(entry(), sort_priority(get_all_tasks()));
    assert(
      new_rank < prev_rank || (prev_rank == 0 && new_rank == 0),
      `test of ${which}_priority failed (1)`
    );
  } else {
    args["Importance"] = entry().field("Importance") - 1;
    set_priority();
    let new_rank = rank(entry(), sort_priority(get_all_tasks()));
    assert(
      new_rank > prev_rank ||
        (new_rank == entries.length && prev_rank == entries.length),
      `test of ${which}_priority failed (1) --- ${new_rank} ${prev_rank}`
    );
  }
  assert(
    Math.abs(average_priority()) < 0.01,
    `test of ${which}_priority failed (2)`
  );
}
test_inc_dec_priority("increase");
test_inc_dec_priority("decrease");
