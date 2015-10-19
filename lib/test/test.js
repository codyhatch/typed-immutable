(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "tape"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("tape"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.tape);
    global.test = mod.exports;
  }
})(this, function (exports, _tape) {
  "use strict";

  exports["default"] = function (description, unit) {
    return _tape.test(description, function (test) {
      var result = unit(test);
      if (result && result.then) {
        result.then(function (_) {
          return test.end();
        }, function (error) {
          return test.end(error || true);
        });
      } else {
        test.end();
      }
    });
  };
});