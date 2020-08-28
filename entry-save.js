var entries = lib().entries();

entry().set("randnum", Math.random());

var averageRuntime = 0;
for (var i = 0; i < entries.length; i++) {
    averageRuntime += entries[i].field("Runtime");
}
averageRuntime /= entries.length;
entry().set("Runtime", averageRuntime);