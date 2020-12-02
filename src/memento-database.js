var Entry = /** @class */ (function () {
    function Entry() {
    }
    Entry.prototype.field = function (name) {
        return this.fields[name];
    };
    Entry.prototype.set = function (name, value) {
        this.fields[name] = value;
    };
    return Entry;
}());
var Entries = /** @class */ (function () {
    function Entries() {
    }
    return Entries;
}());
var Library = /** @class */ (function () {
    function Library() {
    }
    Library.prototype.entries = function () {
        return entries;
    };
    Library.prototype.create = function (values) {
        return;
    };
    return Library;
}());
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
var current_entry;
var library;
var entries;
var args;
