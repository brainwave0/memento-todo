class Entry {
  fields: { name: any };
  id: number;
  field(name: string): any {
    return this.fields[name];
  }
  set(name: string, value: any): void {
    this.fields[name] = value;
  }
}
class Entries {
  length: number;
  contents: Entry[];
}
class Library {
  entries(): Entries {
    return entries;
  }
  create(values) {
    return;
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
  return;
}
var current_entry: Entry;
var library: Library;
var entries: Entries;
var args: { name: any };
