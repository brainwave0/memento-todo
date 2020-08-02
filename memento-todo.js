function isDone() {
    return entry().field("Repeat From") && entry().field("Repeat From").getTime() + entry().field("Repeat Interval") > Date.now()
        || entry().field("Start At") && entry().field("Start At").getTime() > Date.now()
        || entry().field("Cool down from") && entry().field("Cool down from").getTime() + entry().field("Cooldown") > Date.now();
}
function increaseCooldown() {
    multCooldown(1.25);
}
function reduceCooldown() {
    multCooldown(0.8);
}
function multCooldown(factor) {
    entry().set("Cooldown", Math.max(entry().field("Cooldown") * factor, 480000));
}
function success() {
    return elapsed() >= entry().field("Best time") * 0.8;
}
function setBestTime() {
    entry().set("Best time", Math.max(elapsed(), entry().field("Best time")));
}
function elapsed() {
    return Date.now() - entry().field("Repeat From").getTime()
}
function finish() {
    entry().set("Cool down from", Date.now());
    if (success()) {
        reduceCooldown();
    } else {
        increaseCooldown();
    }
    setBestTime();
    entry().set("Running", false);
}
function start() {
    entry().set("Repeat From", Date.now());
    entry().set("Running", true);
}
if (entry().field("Running")) {
    finish();
} else {
    start();
}
