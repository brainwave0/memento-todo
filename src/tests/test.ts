/// <reference path="./test-data"/>
/// <reference path="../memento-database"/>
/// <reference path="./actions/cancel"/>
/// <reference path="./actions/done"/>
/// <reference path="./actions/set-priority"/>
/// <reference path="./actions/pick-task"/>
/// <reference path="./actions/reschedule"/>
/// <reference path="./actions/start-stop"/>
/// <reference path="../util"/>
/// <reference path="./instant-runoff"/>
/// <reference path="./set-priority"/>
/// <reference path="./util"/>
/// <reference path="./xbisect"/>
function init_sim() {
  library = new Library;
  entries = new Entries();
  args = {};
  for (let obj of test_data) {
    library.create(Object.assign({}, obj));
  }
  current_entry = random_choice(lib().entries());
}
