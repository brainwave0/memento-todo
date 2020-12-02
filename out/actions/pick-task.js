var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, _a;
var lists = [];
var all_tasks = get_all_tasks();
try {
    for (var sort_categories_1 = __values(sort_categories), sort_categories_1_1 = sort_categories_1.next(); !sort_categories_1_1.done; sort_categories_1_1 = sort_categories_1.next()) {
        var fn = sort_categories_1_1.value;
        lists.push(fn(all_tasks));
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (sort_categories_1_1 && !sort_categories_1_1.done && (_a = sort_categories_1.return)) _a.call(sort_categories_1);
    }
    finally { if (e_1) throw e_1.error; }
}
instant_runoff(lists).show();
