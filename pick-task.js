var SortDir;
(function (SortDir) {
  SortDir[(SortDir["Ascending"] = 0)] = "Ascending";
  SortDir[(SortDir["Descending"] = 1)] = "Descending";
})(SortDir || (SortDir = {}));
function ascending_wait_time(entries) {
  return sort(
    entries,
    function (e) {
      return e.field("Wait time");
    },
    SortDir.Ascending
  );
}
function ascending_slack_time(entries) {
  return sort(
    entries,
    function (e) {
      return slack_time(e);
    },
    SortDir.Ascending
  );
}
function ascending_expensiveness(entries) {
  return sort(
    entries,
    function (e) {
      return e.field("Expensiveness");
    },
    SortDir.Ascending
  );
}
function descending_importance(entries) {
  return sort(
    entries,
    function (e) {
      return e.field("Importance");
    },
    SortDir.Descending
  );
}
function sort(elems, field_selector, sort_direction) {
  if (sort_direction == SortDir.Ascending) {
    return elems.sort(function (a, b) {
      return field_selector(a) - field_selector(b);
    });
  } else {
    return elems.sort(function (a, b) {
      return field_selector(b) - field_selector(a);
    });
  }
}
function slack_time(e) {
  var deadline = e.field("Deadline") || Date.now();
  var expected_runtime = e.field("Expected runtime") || 0;
  return deadline - Date.now() - expected_runtime;
}
var sort_categories = [
  ascending_wait_time,
  ascending_slack_time,
  ascending_expensiveness,
  descending_importance,
];
function to_array(iterable) {
  var result = [];
  for (var i = 0; i < iterable.length; i++) {
    result.push(iterable[i]);
  }
  return result;
}
function ready(task) {
  return (
    !task.field("Start datetime") || task.field("Start datetime") < Date.now()
  );
}
function active_tasks() {
  return to_array(lib().entries()).filter(function (x) {
    return ready(x);
  });
}
function get_all_tasks() {
  return to_array(lib().entries());
}
function sum(nums) {
  return nums.reduce(function (a, b) {
    return a + b;
  }, 0);
}
var __values =
  (this && this.__values) ||
  function (o) {
    var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        },
      };
    throw new TypeError(
      s ? "Object is not iterable." : "Symbol.iterator is not defined."
    );
  };
function instant_runoff(lists) {
  var first_choices = lists.map(head);
  var candidate_votes = counts(first_choices);
  var total_votes = sum(candidate_votes.map(second));
  var winner = candidate_votes.filter(function (x) {
    return x[1] > total_votes / 2;
  })[0];
  if (winner) {
    return winner;
  } else {
    var last_place_candidate_1 = shuffleArray(candidate_votes).sort(function (
      a,
      b
    ) {
      return a[1] - b[1];
    })[0];
    if (first_choices.length > 2) {
      return instant_runoff(
        lists.map(function (xs) {
          return xs.filter(function (x) {
            return x != last_place_candidate_1;
          });
        })
      );
    } else if (Math.random() > 0.5) {
      return first_choices[0];
    } else {
      return first_choices[1];
    }
  }
}
function counts(xs) {
  var e_1, _a;
  var count_map;
  var _loop_1 = function (x) {
    if (count_map.map(head).includes(x)) {
      count_map.find(function (y) {
        return y[0] == x;
      })[1] += 1;
    } else {
      count_map.push([x, 1]);
    }
  };
  try {
    for (
      var xs_1 = __values(xs), xs_1_1 = xs_1.next();
      !xs_1_1.done;
      xs_1_1 = xs_1.next()
    ) {
      var x = xs_1_1.value;
      _loop_1(x);
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (xs_1_1 && !xs_1_1.done && (_a = xs_1.return)) _a.call(xs_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  return count_map;
}
function head(xs) {
  return xs[0];
}
function second(pair) {
  return pair[1];
}
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
var e_2, _a;
var lists = [];
var all_tasks = get_all_tasks();
try {
  for (
    var sort_categories_1 = __values(sort_categories),
      sort_categories_1_1 = sort_categories_1.next();
    !sort_categories_1_1.done;
    sort_categories_1_1 = sort_categories_1.next()
  ) {
    var fn = sort_categories_1_1.value;
    lists.push(fn(all_tasks));
  }
} catch (e_2_1) {
  e_2 = { error: e_2_1 };
} finally {
  try {
    if (
      sort_categories_1_1 &&
      !sort_categories_1_1.done &&
      (_a = sort_categories_1.return)
    )
      _a.call(sort_categories_1);
  } finally {
    if (e_2) throw e_2.error;
  }
}
instant_runoff(lists).show();
