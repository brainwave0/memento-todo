class Entry {
  fields = {};
  id;
  constructor() {
    this.id = 0;
  }
  field(name) {
    return this.fields[name];
  }
  set(name, value) {
    this.fields[name] = value;
  }
  show() {
    return this;
  }
}
class Entries {
  length;
  next_id;
  constructor() {
    this.next_id = 0;
    this.length = 0;
  }
}
class Library {
  entries() {
    return entries;
  }
  create(values) {
    let new_entry = new Entry();
    new_entry.id = entries.length;
    new_entry.fields = values;
    entries[entries.next_id] = new_entry;
    entries.next_id += 1;
    entries.length += 1;
  }
}
function entry() {
  return current_entry;
}
function lib() {
  return library;
}
function arg(name) {
  return args[name];
}
function libByName(name) {
  return new Library();
}
function message(x) {
  console.log(x);
}
var current_entry;
var library;
var entries;
var args = {};
