function to_array(iterable) {
  var result = [];
  for (var i = 0; i < iterable.length; i++) {
    result.push(iterable[i]);
  }
  return result;
}
function ready(task) {
  return (
    !task.field("Start datetime") ||
    task.field("Start datetime").getTime() <= Date.now()
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
function shuffle_array(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
var SortDir;
(function (SortDir) {
  SortDir[(SortDir["Ascending"] = 0)] = "Ascending";
  SortDir[(SortDir["Descending"] = 1)] = "Descending";
})(SortDir || (SortDir = {}));
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
function copy_array(xs) {
  var result = [];
  for (var _i = 0, xs_1 = xs; _i < xs_1.length; _i++) {
    var x = xs_1[_i];
    result.push(x);
  }
  return result;
}
var sort_orders = [
  function start_datetime(entries) {
    return sort(
      entries,
      function (e) {
        return e.field("Start datetime");
      },
      SortDir.Ascending
    );
  },
  function deadline(entries) {
    return sort(
      entries.filter(function (x) {
        return !x.field("Deadline");
      }),
      function (e) {
        return e.field("Deadline");
      },
      SortDir.Ascending
    );
  },
  function value(entries) {
    return sort(
      entries.filter(function (x) {
        return !x.field("Total runtime");
      }),
      function (e) {
        return e.field("Value") / e.field("Total runtime");
      },
      SortDir.Descending
    );
  },
  function importance(entries) {
    return sort(
      entries,
      function (e) {
        return e.field("Importance");
      },
      SortDir.Descending
    );
  },
  function remaining_runtime(entries) {
    return sort(
      entries,
      function (e) {
        return e.field("Expected runtime")
          ? e.field("Expected runtime") - e.field("Runtime")
          : e.field("Runtime");
      },
      SortDir.Ascending
    );
  },
];
function instant_runoff(lists) {
  var first_choices = lists.map(head);
  var candidate_votes = counts(first_choices);
  var total_votes = sum(candidate_votes.map(second));
  var winner = head(
    head(
      candidate_votes.filter(function (x) {
        return x[1] > total_votes / 2;
      })
    )
  );
  if (winner) {
    return winner;
  } else {
    var last_place_candidate_1 = head(
      head(
        candidate_votes
          .sort(function (a, b) {
            return a[0].field("randnum") - b[0].field("randnum");
          })
          .sort(function (a, b) {
            return a[1] - b[1];
          })
      )
    );
    if (last_place_candidate_1 && first_choices.length > 1) {
      return instant_runoff(
        lists
          .map(function (xs) {
            return xs.filter(function (x) {
              return x != last_place_candidate_1;
            });
          })
          .filter(function (x) {
            return x.length > 0;
          })
      );
    } else if (first_choices.length == 1) {
      return first_choices[0];
    } else {
      throw "failed to pick";
    }
  }
}
function counts(xs) {
  var count_map = [];
  for (var _i = 0, xs_2 = xs; _i < xs_2.length; _i++) {
    var x = xs_2[_i];
    var index = count_map.map(head).indexOf(x);
    if (index > -1) {
      count_map[index][1] += 1;
    } else {
      count_map.push([x, 1]);
    }
  }
  return count_map;
}
function head(xs) {
  if (xs) {
    return xs[0];
  } else {
    return undefined;
  }
}
function second(pair) {
  return pair[1];
}
function print_lists(lists) {
  for (var _i = 0, lists_1 = lists; _i < lists_1.length; _i++) {
    var list = lists_1[_i];
    var line = "";
    for (var _a = 0, list_1 = list; _a < list_1.length; _a++) {
      var x = list_1[_a];
      line += Math.floor(x.field("randnum") * 1000) + " ";
    }
    console.log(line);
  }
  console.log();
}
var AndroidAlarm = {
  create: function (hour, minutes, message, options) {
    i = intent("android.intent.action.SET_ALARM");
    i.extraInt("android.intent.extra.alarm.HOUR", hour);
    i.extraInt("android.intent.extra.alarm.MINUTES", minutes);
    if (message !== undefined)
      i.extra("android.intent.extra.alarm.MESSAGE", message);
    if (options !== undefined) {
      if (options.days !== undefined)
        i.extraArrayInt("android.intent.extra.alarm.DAYS", options.days);
      if (options.vibrate !== undefined)
        i.extraBool("android.intent.extra.alarm.VIBRATE", options.vibrate);
      if (options.skipUI !== undefined)
        i.extraBool("android.intent.extra.alarm.SKIP_UI", options.skipUI);
    }
    i.send();
  },
  timer: function (length, message, skipUI) {
    i = intent("android.intent.action.SET_TIMER");
    i.extraInt("android.intent.extra.alarm.LENGTH", length);
    if (message !== undefined)
      i.extra("android.intent.extra.alarm.MESSAGE", message);
    if (skipUI !== undefined)
      i.extraBool("android.intent.extra.alarm.SKIP_UI", skipUI);
    i.send();
  },
};
var timer_duration = 32 * 60;
function start(entry) {
  create_log_entry('Started entry "' + entry.field("Name") + '"');
  entry.set("Timer start", new Date(Date.now()));
  toggle_running(entry);
}
function finish() {
  create_log_entry('Finished entry "' + entry().field("Name") + '"');
  entry().set("Runtime", entry().field("Runtime") + elapsed());
  entry().set("Total runtime", entry().field("Total runtime") + elapsed());
  entry().set("Value", entry().field("Value") + arg("Rating"));
  toggle_running(entry());
}
function set_timer() {
  AndroidAlarm.timer(timer_duration, entry().field("Name"), false);
}
function toggle_running(entry) {
  entry.set("Running", !entry.field("Running"));
}
function elapsed() {
  return Date.now() - entry().field("Timer start").getTime();
}
function create_log_entry(text) {
  libByName("Log").create({
    Description: text,
    Datetime: new Date(Date.now()),
  });
}
function start_stop() {
  if (entry().field("Running")) {
    finish();
  } else {
    start(entry());
  }
}
function pick_task() {
  var lists = [];
  for (
    var _i = 0, sort_orders_1 = sort_orders;
    _i < sort_orders_1.length;
    _i++
  ) {
    var fn = sort_orders_1[_i];
    lists.push(copy_array(fn(active_tasks())));
  }
  var task = instant_runoff(lists);
  start(task);
  task.show();
  return task;
}
