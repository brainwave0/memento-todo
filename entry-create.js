var entries = lib().entries();

entry().set("randnum", Math.random());

var avg_vruntime = 0;
for (var i = 0; i < entries.length; i++) {
  avg_vruntime += vruntime(entries[i]);
}
avg_vruntime /= entries.length;
entry().set("Runtime", avg_vruntime);
