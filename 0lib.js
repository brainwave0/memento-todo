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
  return to_array(lib().entries())
    .filter((x) => x.field("Done") == 0)
    .sort((a, b) => vruntime(a) - vruntime(b));
}
function vruntime(task) {
  return Math.pow(0.8, task.field("Priority")) * task.field("Runtime");
}
