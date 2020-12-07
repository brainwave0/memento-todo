function to_array(iterable){var result=[];for(var i=0;i<iterable.length;i++){result.push(iterable[i])}return result}function ready(task){return!task.field("Start datetime")||task.field("Start datetime")<Date.now()}function active_tasks(){return to_array(lib().entries()).filter(function(x){return ready(x)})}function get_all_tasks(){return to_array(lib().entries())}function sum(nums){return nums.reduce(function(a,b){return a+b},0)}function shuffleArray(array){for(var i=array.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var temp=array[i];array[i]=array[j];array[j]=temp}return array}var SortDir;(function(SortDir){SortDir[SortDir["Ascending"]=0]="Ascending";SortDir[SortDir["Descending"]=1]="Descending"})(SortDir||(SortDir={}));function latest_attempt(entries){return sort(entries,function(e){return e.field("Latest attempt")},SortDir.Ascending)}function deadline(entries){return sort(entries,function(e){return e.field("Deadline")},SortDir.Ascending)}function value(entries){return sort(entries,function(e){return e.field("Value")/e.field("Total runtime")},SortDir.Descending)}function importance(entries){return sort(entries,function(e){return e.field("Importance")},SortDir.Descending)}function remaining_runtime(entries){return sort(entries,function(e){return Math.max(e.field("Expected runtime"),e.field("Runtime"))-e.field("Runtime")},SortDir.Ascending)}function runtime(entries){return sort(entries,function(e){return e.field("Runtime")},SortDir.Ascending)}function sort(elems,field_selector,sort_direction){if(sort_direction==SortDir.Ascending){return elems.sort(function(a,b){return field_selector(a)-field_selector(b)})}else{return elems.sort(function(a,b){return field_selector(b)-field_selector(a)})}}var sort_orders=[latest_attempt,deadline,value,importance,remaining_runtime,runtime];message(remaining_runtime(active_tasks()).map(function(x){return x.field("Name")}));