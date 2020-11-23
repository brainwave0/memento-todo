function move_task(index) {
  var tasks = active_tasks();

  var new_vruntime;
  if (index <= 0) {
    new_vruntime = vruntime(tasks[0]) / 2;
  } else if (index >= tasks.length) {
    new_vruntime = vruntime(tasks[index]) + 1;
  } else {
    new_vruntime =
      (vruntime(tasks[index - 1]) + vruntime(tasks[index + 1])) / 2;
  }

  entry().set(
    "Priority",
    Math.log(0.8, new_vruntime / entry().field("Runtime"))
  );
}
