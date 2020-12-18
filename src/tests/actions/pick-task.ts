/// <reference path="../../actions/pick-task"/>
message("testing pick-task")
function all_same_list(lists) {
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].length != lists[i + 1].length) {
      return false;
    } else {
      for (let j = 0; j < lists[i].length; j++) {
        if (lists[i][j] != lists[i + 1][j]) {
          return false;
        }
      }
    }
  }
  return true;
}
init_sim();
let lists = pick_task();
assert(!all_same_list(lists), "test of pick_task failed");
