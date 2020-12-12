class Entry {
  fields = {};
  id: number;
  constructor() {
    this.id = 0;
  }
  field(name: string): any {
    return this.fields[name];
  }
  set(name: string, value: any): void {
    this.fields[name] = value;
  }
  show(): Entry {
    return this;
  }
}
class Entries {
  length: number;
  next_id: number;
  constructor() {
    this.next_id = 0;
    this.length = 0;
  }
}
class Library {
  entries(): Entries {
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
function entry(): Entry {
  return current_entry;
}
function lib(): Library {
  return library;
}
function arg(name: string): any {
  return args[name];
}
function libByName(name: string): Library {
  return new Library();
}
function message(x): void {
  console.log(x);
}
var current_entry: Entry;
var library: Library;
var entries: Entries;
var args = {};
