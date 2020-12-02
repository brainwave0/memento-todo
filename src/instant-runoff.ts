/// <reference path="./util"/>

function instant_runoff(lists: any[][]): any {
    let first_choices = lists.map(head);
    let candidate_votes = counts(first_choices);
    let total_votes = sum(candidate_votes.map(second));
    let winner = candidate_votes.filter(x => x[1] > total_votes / 2)[0];
    if (winner) {
        return winner;
    } else {
        let last_place_candidate = shuffleArray(candidate_votes).sort((a, b) => a[1] - b[1])[0];
        if (first_choices.length > 2) {
            return instant_runoff(lists.map(xs => xs.filter(x => x != last_place_candidate)));
        } else if (Math.random() > 0.5) {
            return first_choices[0];
        } else {
            return first_choices[1];
        }
    }
}
function counts(xs: any[]): [any, number][] {
    let count_map: [any, number][] = [];
    for (let x of xs) {
        if (count_map.map(head).includes(x)) {
            count_map.find(y => y[0] == x)[1] += 1;
        } else {
            count_map.push([x, 1]);
        }
    }
    return count_map;
}
function head(xs: any[]): any {
    return xs[0];
}
function second(pair: [any, any]): any {
    return pair[1];
}

function shuffleArray(array: any[]): any[] {
    for (var i = array.length - 1; i > 0; i--) {

        // Generate random number  
        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}
