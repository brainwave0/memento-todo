function adjust_priority(task) {
    if (task) {
        task.set("Priority", task.field("Priority") + arg("priority delta"));
        adjust_priority(get_parent(task));
    }
}
