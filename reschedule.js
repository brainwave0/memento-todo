if (arg("Specific datetime")) {
    entry().set("Start datetime", arg("Specific datetime"));
} else if (arg("Repeat interval")) {
    entry().set("Start datetime", Date.now() + arg("Repeat interval"));
} else if (arg("Specific duration")) {
    entry().set("Start datetime", Date.now() + arg("Specific duration"));
}
