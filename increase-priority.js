function increase_priority(task) {
    task.set("Priority", task.field("Priority") + 1);
}

increase_priority(entry());
