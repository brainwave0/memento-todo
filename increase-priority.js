function to_array(iterable){var result=[];for(var i=0;i<iterable.length;i++){result.push(iterable[i])}return result}function ready(task){return!task.field("Start datetime")||task.field("Start datetime").getTime()<=Date.now()}function active_tasks(){return to_array(lib().entries()).filter(function(x){return ready(x)})}function get_all_tasks(){return to_array(lib().entries())}function sum(nums,f){if(f===void 0){f=id}return nums.map(f).reduce(function(a,b){return a+b},0)}function shuffle_array(array){for(var i=array.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var temp=array[i];array[i]=array[j];array[j]=temp}return array}var SortDir;(function(SortDir){SortDir[SortDir["Ascending"]=0]="Ascending";SortDir[SortDir["Descending"]=1]="Descending"})(SortDir||(SortDir={}));function sort(elems,field_selector,sort_direction){if(sort_direction==SortDir.Ascending){return elems.sort(function(a,b){return field_selector(a)-field_selector(b)})}else{return elems.sort(function(a,b){return field_selector(b)-field_selector(a)})}}function copy_array(xs){var result=[];for(var _i=0,xs_1=xs;_i<xs_1.length;_i++){var x=xs_1[_i];result.push(x)}return result}function assert(p,msg){if(!p){throw msg}}function id(x){return x}function adjust_priority(amount){var avg_priority=average_priority();if(avg_priority<0&&amount<0||avg_priority>=0&&amount>0){adjust_other(entry(),-amount)}else if(avg_priority<0&&amount>0||avg_priority>=0&&amount<0){entry().set("Importance",entry().field("Importance")+amount)}}function adjust_other(entry,amount){get_all_tasks().filter(function(x){return x.id!=entry.id}).forEach(function(x){return x.set("Importance",x.field("Importance")+amount)})}function average_priority(){var all_tasks=get_all_tasks();return sum(all_tasks.map(function(x){return x.field("Importance")}))/all_tasks.length}function increase_priority(){adjust_priority(1)}