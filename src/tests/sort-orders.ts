// stochastic
init_sim();
assert(
  unique(stochastic(get_all_tasks()), by_id),
  "test of stochastic failed (1)"
);
assert(
  !array_equals(stochastic(get_all_tasks()), stochastic(get_all_tasks())),
  "test of stochastic failed (2)"
);
