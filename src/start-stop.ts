/// <reference path="./memento-database"/>
/// <reference path="./util"/>
function elapsed() {
  return Date.now() - entry().field("Timer start").getTime();
}
function create_log_entry(text: string): void {
  libByName("Log").create({
    Description: text,
    Datetime: new Date(Date.now()),
  });
}

