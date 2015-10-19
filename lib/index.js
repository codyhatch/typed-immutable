(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./record", "./list", "./typed"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./record"), require("./list"), require("./typed"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.record, global.list, global.typed);
    global.index = mod.exports;
  }
})(this, function (exports, _record, _list, _typed) {
  "use strict";

  Object.defineProperty(exports, "Record", {
    enumerable: true,
    get: function get() {
      return _record.Record;
    }
  });
  Object.defineProperty(exports, "List", {
    enumerable: true,
    get: function get() {
      return _list.List;
    }
  });
  Object.defineProperty(exports, "Typed", {
    enumerable: true,
    get: function get() {
      return _typed.Typed;
    }
  });
  Object.defineProperty(exports, "typeOf", {
    enumerable: true,
    get: function get() {
      return _typed.typeOf;
    }
  });
  Object.defineProperty(exports, "Type", {
    enumerable: true,
    get: function get() {
      return _typed.Type;
    }
  });
  Object.defineProperty(exports, "Any", {
    enumerable: true,
    get: function get() {
      return _typed.Any;
    }
  });
  Object.defineProperty(exports, "Union", {
    enumerable: true,
    get: function get() {
      return _typed.Union;
    }
  });
  Object.defineProperty(exports, "Maybe", {
    enumerable: true,
    get: function get() {
      return _typed.Maybe;
    }
  });
});