var AndroidAlarm={create:function(hour,minutes,message,options){i=intent("android.intent.action.SET_ALARM");i.extraInt("android.intent.extra.alarm.HOUR",hour);i.extraInt("android.intent.extra.alarm.MINUTES",minutes);if(message!==undefined)i.extra("android.intent.extra.alarm.MESSAGE",message);if(options!==undefined){if(options.days!==undefined)i.extraArrayInt("android.intent.extra.alarm.DAYS",options.days);if(options.vibrate!==undefined)i.extraBool("android.intent.extra.alarm.VIBRATE",options.vibrate);if(options.skipUI!==undefined)i.extraBool("android.intent.extra.alarm.SKIP_UI",options.skipUI)}i.send()},timer:function(length,message,skipUI){i=intent("android.intent.action.SET_TIMER");i.extraInt("android.intent.extra.alarm.LENGTH",length);if(message!==undefined)i.extra("android.intent.extra.alarm.MESSAGE",message);if(skipUI!==undefined)i.extraBool("android.intent.extra.alarm.SKIP_UI",skipUI);i.send()}};var timer_duration=32*60;function to_array(iterable){var result=[];for(var i=0;i<iterable.length;i++){result.push(iterable[i])}return result}function ready(task){return!task.field("Start datetime")||task.field("Start datetime").getTime()<=Date.now()}function active_tasks(){return to_array(lib().entries()).filter(function(x){return ready(x)})}function get_all_tasks(){return to_array(lib().entries())}function sum(nums){return nums.reduce(function(a,b){return a+b},0)}function shuffle_array(array){for(var i=array.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var temp=array[i];array[i]=array[j];array[j]=temp}return array}var SortDir;(function(SortDir){SortDir[SortDir["Ascending"]=0]="Ascending";SortDir[SortDir["Descending"]=1]="Descending"})(SortDir||(SortDir={}));function sort(elems,field_selector,sort_direction){if(sort_direction==SortDir.Ascending){return elems.sort(function(a,b){return field_selector(a)-field_selector(b)})}else{return elems.sort(function(a,b){return field_selector(b)-field_selector(a)})}}function copy_array(xs){var result=[];for(var _i=0,xs_1=xs;_i<xs_1.length;_i++){var x=xs_1[_i];result.push(x)}return result}function start(){create_log_entry("Started entry \""+entry().field("Name")+"\"");entry().set("Timer start",new Date(Date.now()));toggle_running()}function finish(){create_log_entry("Finished entry \""+entry().field("Name")+"\"");entry().set("Runtime",entry().field("Runtime")+elapsed());entry().set("Total runtime",entry().field("Total runtime")+elapsed());entry().set("Value",entry().field("Value")+arg("Rating"));entry().set("Latest attempt",new Date(Date.now()));toggle_running()}function set_timer(){AndroidAlarm.timer(timer_duration,entry().field("Name"),false)}function toggle_running(){entry().set("Running",!entry().field("Running"))}function elapsed(){return Date.now()-entry().field("Timer start").getTime()}function create_log_entry(text){libByName("Log").create({Description:text,Datetime:new Date(Date.now())})}function start_stop(){if(entry().field("Running")){finish()}else{start()}}