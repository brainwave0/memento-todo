function move_task(index) {
  var tasks = active_tasks();

  var new_vruntime = 0;
  if (index <= 0) {
    new_vruntime += 0;
  } else {
    new_vruntime += vruntime(tasks[index - 1]);
  }
  if (index >= tasks.length) {
    new_vruntime += vruntime(tasks[length - 1]);
  } else {
    new_vruntime += vruntime(tasks[index + 1]);
  }
  new_vruntime /= 2;

  entry().set(
    "Priority",
    Math.log(0.8, new_vruntime / entry().field("Runtime"))
  );
}
