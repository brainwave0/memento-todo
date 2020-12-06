function to_array(iterable){var result=[];for(var i=0;i<iterable.length;i++){result.push(iterable[i])}return result}function ready(task){return!task.field("Start datetime")||task.field("Start datetime")<Date.now()}function active_tasks(){return to_array(lib().entries()).filter(function(x){return ready(x)})}function get_all_tasks(){return to_array(lib().entries())}function sum(nums){return nums.reduce(function(a,b){return a+b},0)}function shuffleArray(array){for(var i=array.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var temp=array[i];array[i]=array[j];array[j]=temp}return array}var SortDir;(function(SortDir){SortDir[SortDir["Ascending"]=0]="Ascending";SortDir[SortDir["Descending"]=1]="Descending"})(SortDir||(SortDir={}));function latest_attempt(entries){return sort(entries,function(e){return e.field("Latest attempt")},SortDir.Ascending)}function deadline(entries){return sort(entries,function(e){return e.field("Deadline")},SortDir.Ascending)}function value(entries){return sort(entries,function(e){return e.field("Value")},SortDir.Descending)}function importance(entries){return sort(entries,function(e){return e.field("Importance")},SortDir.Descending)}function remaining_runtime(entries){return sort(entries,function(e){return e.field("Expected runtime")-e.field("Runtime")},SortDir.Ascending)}function runtime(entries){return sort(entries,function(e){return e.field("Runtime")},SortDir.Ascending)}function sort(elems,field_selector,sort_direction){if(sort_direction==SortDir.Ascending){return elems.sort(function(a,b){return field_selector(a)-field_selector(b)})}else{return elems.sort(function(a,b){return field_selector(b)-field_selector(a)})}}var sort_orders=[latest_attempt,deadline,value,importance,remaining_runtime,runtime];function instant_runoff(lists){var first_choices=lists.map(head);var candidate_votes=counts(first_choices);var total_votes=sum(candidate_votes.map(second));var winner=head(head(candidate_votes.filter(function(x){return x[1]>total_votes/2})));if(winner){return winner}else{var last_place_candidate_1=shuffleArray(candidate_votes).sort(function(a,b){return a[1]-b[1]})[0][0];if(first_choices.length>2){return instant_runoff(lists.map(function(xs){return xs.filter(function(x){return x!=last_place_candidate_1})}).filter(function(x){return x.length>0}))}else if(Math.random()>0.5){return first_choices[0]}else{return first_choices[1]}}}function counts(xs){var count_map=[];var _loop_1=function(x){if(count_map.map(head).indexOf(x)>-1){count_map.find(function(y){return y[0]==x})[1]+=1}else{count_map.push([x,1])}};for(var _i=0,xs_1=xs;_i<xs_1.length;_i++){var x=xs_1[_i];_loop_1(x)}return count_map}function head(xs){if(xs){return xs[0]}else{return undefined}}function second(pair){return pair[1]}var lists=[];var tasks=shuffleArray(active_tasks());for(var _i=0,sort_orders_1=sort_orders;_i<sort_orders_1.length;_i++){var fn=sort_orders_1[_i];lists.push(fn(tasks))}instant_runoff(lists).show();