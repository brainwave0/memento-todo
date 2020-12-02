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
function instant_runoff(lists) {
    var first_choices = lists.map(head);
    var candidate_votes = counts(first_choices);
    var total_votes = sum(candidate_votes.map(second));
    var winner = candidate_votes.filter(function (x) { return x[1] > total_votes / 2; })[0];
    if (winner) {
        return winner;
    }
    else {
        var last_place_candidate_1 = shuffleArray(candidate_votes).sort(function (a, b) { return a[1] - b[1]; })[0];
        if (first_choices.length > 2) {
            return instant_runoff(lists.map(function (xs) { return xs.filter(function (x) { return x != last_place_candidate_1; }); }));
        }
        else if (Math.random() > 0.5) {
            return first_choices[0];
        }
        else {
            return first_choices[1];
        }
    }
}
function counts(xs) {
    var e_1, _a;
    var count_map;
    try {
        for (var xs_1 = __values(xs), xs_1_1 = xs_1.next(); !xs_1_1.done; xs_1_1 = xs_1.next()) {
            var x = xs_1_1.value;
            if (count_map.hasOwnProperty(x)) {
                count_map[x] += 1;
            }
            else {
                count_map[x] = 1;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (xs_1_1 && !xs_1_1.done && (_a = xs_1.return)) _a.call(xs_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return count_map;
}
function head(xs) {
    return xs[0];
}
function second(pair) {
    return pair[1];
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
