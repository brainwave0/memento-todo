function move_task(index) {
  var tasks = active_tasks();

  var new_vruntime;
  if (index <= 0) {
    new_vruntime = vruntime(tasks[0]) - 1;
  } else if (index >= tasks.length) {
    new_vruntime = vruntime(tasks[index]) + 1;
  } else {
    new_vruntime = (vruntime(tasks[index - 1]) + vruntime(tasks[index])) / 2;
  }

  entry().set(
    "Priority",
    Math.log(new_vruntime / entry().field("Runtime")) / Math.log(0.8)
  );
}
