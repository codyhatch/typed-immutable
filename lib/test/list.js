(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./test", "immutable", "../record", "../list", "../typed"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./test"), require("immutable"), require("../record"), require("../list"), require("../typed"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.test, global.Immutable, global.record, global.list, global.typed);
    global.list = mod.exports;
  }
})(this, function (exports, _test, _immutable, _record, _list, _typed) {
  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

  var NumberList = (0, _list.List)(Number);
  var StringList = (0, _list.List)(String);
  var Point = (0, _record.Record)({ x: Number(0),
    y: Number(0) }, 'Point');

  var Points = (0, _list.List)(Point, 'Points');

  var isUpperCase = function isUpperCase(x) {
    return x.toUpperCase() === x;
  };
  var upperCase = function upperCase(x) {
    return x.toUpperCase();
  };
  var inc = function inc(x) {
    return x + 1;
  };
  var isEvent = function isEvent(x) {
    return x % 2 === 0;
  };
  var sum = function sum(x, y) {
    return x + y;
  };
  var concat = function concat(xs, ys) {
    return xs.concat(ys);
  };

  (0, _test["default"])("typed list creation", function (assert) {

    assert.throws(function (_) {
      return (0, _list.List)();
    }, /Typed.List must be passed a type descriptor/);

    assert.throws(function (_) {
      return (0, _list.List)({});
    }, /Typed.List was passed an invalid type descriptor:/);
  });

  (0, _test["default"])("number list", function (assert) {
    var ns1 = NumberList();
    assert.ok(ns1 instanceof _immutable.List);
    assert.ok(ns1 instanceof _list.List);
    assert.ok(ns1 instanceof NumberList);
    assert.equal(ns1.size, 0);

    var ns2 = ns1.push(5);
    assert.ok(ns1 instanceof _immutable.List);
    assert.ok(ns1 instanceof _list.List);
    assert.ok(ns1 instanceof NumberList);
    assert.equal(ns2.size, 1);
    assert.equal(ns2.get(0), 5);
    assert.equal(ns2.first(), 5);
    assert.equal(ns2.last(), 5);
  });

  (0, _test["default"])("empty record list", function (assert) {
    var v = Points();

    assert.ok(v instanceof _immutable.List);
    assert.ok(v instanceof _list.List);
    assert.ok(v instanceof Points);

    assert.equal(v.size, 0);
  });

  (0, _test["default"])("make list as function call", function (assert) {
    var v = Points([{ x: 1 }]);

    assert.ok(v instanceof _immutable.List);
    assert.ok(v instanceof _list.List);
    assert.ok(v instanceof Points);

    assert.equal(v.size, 1);

    assert.ok(v.get(0) instanceof _record.Record);
    assert.ok(v.get(0) instanceof Point);
    assert.deepEqual(v.toJSON(), [{ x: 1, y: 0 }]);
  });

  (0, _test["default"])("make list of records", function (assert) {
    var v = Points.of({ x: 10 }, { x: 15 }, { x: 17 });
    assert.ok(v instanceof _immutable.List);
    assert.ok(v instanceof _list.List);
    assert.ok(v instanceof Points);

    assert.equal(v.size, 3);

    assert.ok(v.get(0) instanceof _record.Record);
    assert.ok(v.get(0) instanceof Point);

    assert.ok(v.get(1) instanceof _record.Record);
    assert.ok(v.get(1) instanceof Point);

    assert.ok(v.get(2) instanceof _record.Record);
    assert.ok(v.get(2) instanceof Point);

    assert.deepEqual(v.toJSON(), [{ x: 10, y: 0 }, { x: 15, y: 0 }, { x: 17, y: 0 }]);
  });

  (0, _test["default"])("make list with new", function (assert) {
    var v = new Points([{ x: 3 }]);

    assert.ok(v instanceof _immutable.List);
    assert.ok(v instanceof _list.List);
    assert.ok(v instanceof Points);

    assert.equal(v.size, 1);

    assert.ok(v.get(0) instanceof _record.Record);
    assert.ok(v.get(0) instanceof Point);
    assert.deepEqual(v.toJSON(), [{ x: 3, y: 0 }]);
  });

  (0, _test["default"])("toString on typed list", function (assert) {
    var points = Points.of({ x: 10 }, { y: 2 });
    var numbers = NumberList.of(1, 2, 3);
    var strings = StringList.of("hello", "world");

    assert.equal(points.toString(), "Points([ Point({ \"x\": 10, \"y\": 0 }), Point({ \"x\": 0, \"y\": 2 }) ])");

    assert.equal(numbers.toString(), "Typed.List(Number)([ 1, 2, 3 ])");

    assert.equal(strings.toString(), "Typed.List(String)([ \"hello\", \"world\" ])");
  });

  (0, _test["default"])("create list from entries", function (assert) {
    var ns1 = NumberList.of(1, 2, 3, 4);
    assert.equal(ns1.toString(), "Typed.List(Number)([ 1, 2, 3, 4 ])");
    assert.equal(ns1[_typed.Typed.typeName](), "Typed.List(Number)");

    assert.deepEqual(ns1.toJSON(), [1, 2, 3, 4]);
  });

  (0, _test["default"])("converts sequences to list", function (assert) {
    var seq = _immutable.Seq([{ x: 1 }, { x: 2 }]);
    var v = Points(seq);

    assert.ok(v instanceof _immutable.List);
    assert.ok(v instanceof _list.List);
    assert.ok(v instanceof Points);

    assert.equal(v.size, 2);

    assert.ok(v.get(0) instanceof _record.Record);
    assert.ok(v.get(0) instanceof Point);
    assert.ok(v.get(1) instanceof _record.Record);
    assert.ok(v.get(1) instanceof Point);

    assert.deepEqual(v.toJSON(), [{ x: 1, y: 0 }, { x: 2, y: 0 }]);
  });

  (0, _test["default"])("can be subclassed", function (assert) {
    var Graph = (function (_Points) {
      _inherits(Graph, _Points);

      function Graph() {
        _classCallCheck(this, Graph);

        _get(Object.getPrototypeOf(Graph.prototype), "constructor", this).apply(this, arguments);
      }

      _createClass(Graph, [{
        key: "foo",
        value: function foo() {
          var first = this.first();
          var last = this.last();
          return last.x - first.x;
        }
      }]);

      return Graph;
    })(Points);

    var v1 = new Graph([{ y: 3 }, { x: 7 }, { x: 9, y: 4 }]);

    assert.ok(v1 instanceof _immutable.List);
    assert.ok(v1 instanceof _list.List);
    assert.ok(v1 instanceof Points);
    assert.ok(v1 instanceof Graph);

    assert.equal(v1.foo(), 9);
    assert.deepEqual(v1.toJSON(), [{ x: 0, y: 3 }, { x: 7, y: 0 }, { x: 9, y: 4 }]);

    var v2 = v1.set(0, { x: 2, y: 4 });

    assert.ok(v2 instanceof _immutable.List);
    assert.ok(v2 instanceof _list.List);
    assert.ok(v2 instanceof Points);
    assert.ok(v2 instanceof Graph);

    assert.equal(v2.foo(), 7);
    assert.deepEqual(v2.toJSON(), [{ x: 2, y: 4 }, { x: 7, y: 0 }, { x: 9, y: 4 }]);
  });

  (0, _test["default"])("short-circuits if already a list", function (assert) {
    var v1 = Points.of({ x: 2, y: 4 }, { x: 8, y: 3 });

    assert.equal(v1, Points(v1));

    assert.equal(v1, new Points(v1));

    var OtherPoints = (0, _list.List)(Point);

    assert.ok(OtherPoints(v1) instanceof OtherPoints);
    assert.notOk(OtherPoints(v1) instanceof Points);
    assert.notEqual(v1, OtherPoints(v1));
    assert.ok(v1.equals(OtherPoints(v1)));

    assert.ok(new OtherPoints(v1) instanceof OtherPoints);
    assert.notOk(new OtherPoints(v1) instanceof Points);
    assert.notEqual(v1, new OtherPoints(v1));
    assert.ok(v1.equals(new OtherPoints(v1)));

    var SubPoints = (function (_Points2) {
      _inherits(SubPoints, _Points2);

      function SubPoints() {
        _classCallCheck(this, SubPoints);

        _get(Object.getPrototypeOf(SubPoints.prototype), "constructor", this).apply(this, arguments);
      }

      _createClass(SubPoints, [{
        key: "head",
        value: function head() {
          return this.first();
        }
      }]);

      return SubPoints;
    })(Points);

    assert.notEqual(v1, new SubPoints(v1));
    assert.ok(v1.equals(new SubPoints(v1)));

    assert.equal(new SubPoints(v1).head(), v1.first());
  });

  (0, _test["default"])("can be cleared", function (assert) {
    var v1 = Points.of({ x: 1 }, { x: 2 }, { x: 3 });
    var v2 = v1.clear();

    assert.ok(v1 instanceof Points);
    assert.ok(v2 instanceof Points);

    assert.equal(v1.size, 3);
    assert.equal(v2.size, 0);

    assert.deepEqual(v1.toJSON(), [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]);

    assert.deepEqual(v2.toJSON(), []);

    assert.equal(v2.first(), void 0);
  });

  (0, _test["default"])("can construct records", function (assert) {
    var v1 = Points();
    var v2 = v1.push({ x: 1 });
    var v3 = v2.push({ y: 2 });
    var v4 = v3.push({ x: 3, y: 3 });
    var v5 = v4.push(void 0);

    assert.ok(v1 instanceof Points);
    assert.ok(v2 instanceof Points);
    assert.ok(v3 instanceof Points);
    assert.ok(v4 instanceof Points);
    assert.ok(v5 instanceof Points);

    assert.equal(v1.size, 0);
    assert.equal(v2.size, 1);
    assert.equal(v3.size, 2);
    assert.equal(v4.size, 3);
    assert.equal(v5.size, 4);

    assert.deepEqual(v1.toJSON(), []);
    assert.deepEqual(v2.toJSON(), [{ x: 1, y: 0 }]);
    assert.deepEqual(v3.toJSON(), [{ x: 1, y: 0 }, { x: 0, y: 2 }]);
    assert.deepEqual(v4.toJSON(), [{ x: 1, y: 0 }, { x: 0, y: 2 }, { x: 3, y: 3 }]);
    assert.deepEqual(v5.toJSON(), [{ x: 1, y: 0 }, { x: 0, y: 2 }, { x: 3, y: 3 }, { x: 0, y: 0 }]);
  });

  (0, _test["default"])("can update sub-records", function (assert) {
    var v1 = Points.of({ x: 4 }, { y: 4 });
    var v2 = v1.setIn([0, "y"], 5);
    var v3 = v2.set(2, void 0);
    var v4 = v3.setIn([1, "y"], void 0);

    assert.ok(v1 instanceof Points);
    assert.ok(v2 instanceof Points);
    assert.ok(v3 instanceof Points);
    assert.ok(v4 instanceof Points);

    assert.equal(v1.size, 2);
    assert.equal(v2.size, 2);
    assert.equal(v3.size, 3);
    assert.equal(v4.size, 3);

    assert.deepEqual(v1.toJSON(), [{ x: 4, y: 0 }, { x: 0, y: 4 }]);

    assert.deepEqual(v2.toJSON(), [{ x: 4, y: 5 }, { x: 0, y: 4 }]);

    assert.deepEqual(v3.toJSON(), [{ x: 4, y: 5 }, { x: 0, y: 4 }, { x: 0, y: 0 }]);

    assert.deepEqual(v4.toJSON(), [{ x: 4, y: 5 }, { x: 0, y: 0 }, { x: 0, y: 0 }]);
  });

  (0, _test["default"])("serialize & parse", function (assert) {
    var ns1 = NumberList.of(1, 2, 3, 4);

    assert.ok(NumberList(ns1.toJSON()).equals(ns1), "parsing serialized typed list");

    assert.ok(ns1.constructor(ns1.toJSON()).equals(ns1), "parsing with constructor");
  });

  (0, _test["default"])("serialize & parse nested", function (assert) {
    var v1 = Points.of({ x: 1 }, { x: 2 }, { y: 3 });

    assert.ok(Points(v1.toJSON()).equals(v1));
    assert.ok(v1.constructor(v1.toJSON()).equals(v1));
    assert.ok(v1.equals(new Points(v1.toJSON())));

    assert.ok(Points(v1.toJSON()).get(0) instanceof Point);
  });

  (0, _test["default"])("construct with array", function (assert) {
    var ns1 = NumberList([1, 2, 3, 4, 5]);

    assert.ok(ns1 instanceof NumberList);
    assert.ok(ns1.size, 5);
    assert.equal(ns1.get(0), 1);
    assert.equal(ns1.get(1), 2);
    assert.equal(ns1.get(2), 3);
    assert.equal(ns1.get(3), 4);
    assert.equal(ns1.get(4), 5);
  });

  (0, _test["default"])("construct with indexed seq", function (assert) {
    var seq = _immutable.Seq([1, 2, 3]);
    var ns1 = NumberList(seq);

    assert.ok(ns1 instanceof NumberList);
    assert.ok(ns1.size, 3);
    assert.equal(ns1.get(0), 1);
    assert.equal(ns1.get(1), 2);
    assert.equal(ns1.get(2), 3);
  });

  (0, _test["default"])("does not construct form a scalar", function (assert) {
    assert.throws(function (_) {
      return NumberList(3);
    }, /Expected Array or iterable object of values/);
  });

  (0, _test["default"])("can not construct with invalid data", function (assert) {
    var Point = (0, _record.Record)({ x: Number, y: Number }, "Point");
    var Points = (0, _list.List)(Point, "Points");

    assert.throws(function (_) {
      return Points.of({ x: 1, y: 0 }, { y: 2, x: 2 }, { x: 3 });
    }, /"undefined" is not a number/);
  });

  (0, _test["default"])("set and get a value", function (assert) {
    var ns = NumberList();
    var ns2 = ns.set(0, 7);

    assert.equal(ns.size, 0);
    assert.equal(ns.count(), 0);
    assert.equal(ns.get(0), void 0);

    assert.equal(ns2.size, 1);
    assert.equal(ns2.count(), 1);
    assert.equal(ns2.get(0), 7);
  });

  (0, _test["default"])("set and get records", function (assert) {
    var v1 = Points();
    var v2 = v1.set(0, { x: 7 });

    assert.equal(v1.size, 0);
    assert.equal(v1.count(), 0);
    assert.equal(v1.get(0), void 0);

    assert.equal(v2.size, 1);
    assert.equal(v2.count(), 1);
    assert.ok(v2.get(0) instanceof Point);
    assert.ok(v2.get(0).toJSON(), { x: 7, y: 0 });
  });

  (0, _test["default"])("can not set invalid value", function (assert) {
    var ns = NumberList();

    assert.throws(function (_) {
      return ns.set(0, "foo");
    }, /"foo" is not a number/);

    assert.equal(ns.size, 0);
  });

  (0, _test["default"])("can not set invalid structure", function (assert) {
    var v = Points();

    assert.throws(function (_) {
      return v.set(0, 5);
    }, /Invalid data structure/);
  });

  (0, _test["default"])("can not set undeclared fields", function (assert) {
    var v = Points.of({ x: 9 });

    assert.throws(function (_) {
      return v.setIn([0, "d"], 4);
    }, /Cannot set unknown field "d"/);
  });

  (0, _test["default"])("counts from the end of the list on negative index", function (assert) {
    var ns = NumberList.of(1, 2, 3, 4, 5, 6, 7);
    assert.equal(ns.get(-1), 7);
    assert.equal(ns.get(-5), 3);
    assert.equal(ns.get(-9), void 0);
    assert.equal(ns.get(-999, 1000), 1000);
  });

  (0, _test["default"])("coerces numeric-string keys", function (assert) {
    // Of course, TypeScript protects us from this, so cast to "any" to test.
    var ns = NumberList.of(1, 2, 3, 4, 5, 6);

    assert.equal(ns.get('1'), 2);
    assert.equal(ns.get('-1'), 6);
    assert.equal(ns.set('3', 10).get('-3'), 10);
  });

  (0, _test["default"])("setting creates a new instance", function (assert) {
    var v1 = NumberList.of(1);
    var v2 = v1.set(0, 15);

    assert.equal(v1.get(0), 1);
    assert.equal(v2.get(0), 15);

    assert.ok(v1 instanceof NumberList);
    assert.ok(v2 instanceof NumberList);
  });

  (0, _test["default"])("size includes the highest index", function (assert) {
    var v0 = NumberList();
    var v1 = v0.set(0, 1);
    var v2 = v1.set(1, 2);
    var v3 = v2.set(2, 3);

    assert.equal(v0.size, 0);
    assert.equal(v1.size, 1);
    assert.equal(v2.size, 2);
    assert.equal(v3.size, 3);

    assert.ok(v0 instanceof NumberList);
    assert.ok(v1 instanceof NumberList);
    assert.ok(v2 instanceof NumberList);
    assert.ok(v3 instanceof NumberList);
  });

  (0, _test["default"])("get helpers make for easier to read code", function (assert) {
    var v1 = NumberList.of(1, 2, 3);

    assert.equal(v1.first(), 1);
    assert.equal(v1.get(1), 2);
    assert.equal(v1.last(), 3);
  });

  (0, _test["default"])('slice helpers make for easier to read code', function (assert) {
    var v0 = NumberList.of(1, 2, 3);
    var v1 = NumberList.of(1, 2);
    var v2 = NumberList.of(1);
    var v3 = NumberList();

    assert.deepEqual(v0.rest().toArray(), [2, 3]);
    assert.ok(v0.rest() instanceof NumberList);
    assert.deepEqual(v0.butLast().toArray(), [1, 2]);
    assert.ok(v0.butLast() instanceof NumberList);

    assert.deepEqual(v1.rest().toArray(), [2]);
    assert.ok(v1.rest() instanceof NumberList);
    assert.deepEqual(v1.butLast().toArray(), [1]);
    assert.ok(v1.butLast() instanceof NumberList);

    assert.deepEqual(v2.rest().toArray(), []);
    assert.ok(v2.rest() instanceof NumberList);
    assert.deepEqual(v2.butLast().toArray(), []);
    assert.ok(v2.butLast() instanceof NumberList);

    assert.deepEqual(v3.rest().toArray(), []);
    assert.ok(v3.rest() instanceof NumberList);
    assert.deepEqual(v3.butLast().toArray(), []);
    assert.ok(v3.butLast() instanceof NumberList);
  });

  (0, _test["default"])('can set at with in the bonds', function (assert) {
    var v0 = NumberList.of(1, 2, 3);
    var v1 = v0.set(1, 20); // within existing tail
    var v2 = v1.set(3, 30); // at last position

    assert.throws(function (_) {
      return v1.set(4, 4);
    }, /Index "4" is out of bound/);
    assert.throws(function (_) {
      return v2.set(31, 31);
    }, /Index "31" is out of bound/);

    assert.equal(v2.size, v1.size + 1);

    assert.deepEqual(v0.toArray(), [1, 2, 3]);
    assert.deepEqual(v1.toArray(), [1, 20, 3]);
    assert.deepEqual(v2.toArray(), [1, 20, 3, 30]);

    assert.ok(v0 instanceof NumberList);
    assert.ok(v1 instanceof NumberList);
    assert.ok(v2 instanceof NumberList);
  });

  (0, _test["default"])('can contain a large number of indices', function (assert) {
    var input = _immutable.Range(0, 20000);
    var numbers = NumberList(input);
    var iterations = 0;

    assert.ok(numbers.every(function (value) {
      var result = value === iterations;
      iterations = iterations + 1;
      return result;
    }));
  });

  (0, _test["default"])('push inserts at highest index', function (assert) {
    var v0 = NumberList.of(1, 2, 3);
    var v1 = v0.push(4, 5, 6);

    assert.ok(v0 instanceof NumberList);
    assert.ok(v1 instanceof NumberList);

    assert.equal(v0.size, 3);
    assert.equal(v1.size, 6);

    assert.deepEqual(v0.toArray(), [1, 2, 3]);
    assert.deepEqual(v1.toArray(), [1, 2, 3, 4, 5, 6]);
  });

  (0, _test["default"])('pop removes the highest index, decrementing size', function (assert) {
    var v0 = NumberList.of(1, 2, 3);
    var v1 = v0.pop();
    var v2 = v1.push(4);

    assert.equal(v0.last(), 3);
    assert.equal(v0.size, 3);
    assert.deepEqual(v0.toArray(), [1, 2, 3]);

    assert.ok(v1 instanceof NumberList);
    assert.equal(v1.last(), 2);
    assert.equal(v1.size, 2);
    assert.deepEqual(v1.toArray(), [1, 2]);

    assert.ok(v2 instanceof NumberList);
    assert.equal(v2.last(), 4);
    assert.equal(v2.size, 3);
    assert.deepEqual(v2.toArray(), [1, 2, 4]);
  });

  (0, _test["default"])('pop on empty', function (assert) {
    var v0 = NumberList.of(1);
    var v1 = v0.pop();
    var v2 = v1.pop();
    var v3 = v2.pop();
    var v4 = v3.pop();
    var v5 = v4.pop();

    assert.equal(v0.size, 1);
    assert.deepEqual(v0.toArray(), [1]);

    ![v1, v2, v3, v4, v5].forEach(function (v) {
      assert.ok(v instanceof NumberList);
      assert.equal(v.size, 0);
      assert.deepEqual(v.toArray(), []);
    });
  });

  (0, _test["default"])('test removes any index', function (assert) {
    var v0 = NumberList.of(1, 2, 3);
    var v1 = v0.remove(2);
    var v2 = v1.remove(0);
    var v3 = v2.remove(9);
    var v4 = v0.remove(3);
    var v5 = v3.push(5);

    assert.ok(v0 instanceof NumberList);
    assert.ok(v1 instanceof NumberList);
    assert.ok(v2 instanceof NumberList);
    assert.ok(v3 instanceof NumberList);
    assert.ok(v4 instanceof NumberList);
    assert.ok(v5 instanceof NumberList);

    assert.equal(v0.size, 3);
    assert.equal(v1.size, 2);
    assert.equal(v2.size, 1);
    assert.equal(v3.size, 1);
    assert.equal(v4.size, 3);
    assert.equal(v5.size, 2);

    assert.deepEqual(v0.toArray(), [1, 2, 3]);
    assert.deepEqual(v1.toArray(), [1, 2]);
    assert.deepEqual(v2.toArray(), [2]);
    assert.deepEqual(v3.toArray(), [2]);
    assert.deepEqual(v4.toArray(), [1, 2, 3]);
    assert.deepEqual(v5.toArray(), [2, 5]);
  });

  (0, _test["default"])("shift removes from the front", function (assert) {
    var v0 = NumberList.of(1, 2, 3);
    var v1 = v0.shift();

    assert.ok(v0 instanceof NumberList);
    assert.ok(v1 instanceof NumberList);

    assert.deepEqual(v0.toArray(), [1, 2, 3]);
    assert.deepEqual(v1.toArray(), [2, 3]);

    assert.equal(v0.first(), 1);
    assert.equal(v1.first(), 2);

    assert.equal(v0.size, 3);
    assert.equal(v1.size, 2);
  });

  (0, _test["default"])("unshift insert items in the front", function (assert) {
    var v0 = NumberList.of(1, 2, 3);
    var v1 = v0.unshift(11, 12, 13);

    assert.ok(v0 instanceof NumberList);
    assert.ok(v1 instanceof NumberList);

    assert.deepEqual(v0.toArray(), [1, 2, 3]);
    assert.deepEqual(v1.toArray(), [11, 12, 13, 1, 2, 3]);

    assert.equal(v0.first(), 1);
    assert.equal(v1.first(), 11);

    assert.equal(v0.size, 3);
    assert.equal(v1.size, 6);
  });

  (0, _test["default"])('finds values using indexOf', function (assert) {
    var v = NumberList.of(1, 2, 3, 2, 1);

    assert.equal(v.indexOf(2), 1);
    assert.equal(v.indexOf(3), 2);
    assert.equal(v.indexOf(4), -1);
  });

  (0, _test["default"])('finds values using findIndex', function (assert) {
    var v = StringList.of('a', 'b', 'c', 'B', 'a');

    assert.equal(v.findIndex(isUpperCase), 3);
    assert.equal(v.findIndex(function (x) {
      return x.length > 1;
    }), -1);
  });

  (0, _test["default"])('finds values using findEntry', function (assert) {
    var v = StringList.of('a', 'b', 'c', 'B', 'a');

    assert.deepEqual(v.findEntry(isUpperCase), [3, 'B']);
    assert.equal(v.findEntry(function (x) {
      return x.length > 1;
    }), void 0);
  });

  (0, _test["default"])('maps values', function (assert) {
    var v0 = NumberList.of(1, 2, 3);
    var v1 = v0.map(inc);

    assert.ok(v0 instanceof NumberList);
    assert.ok(v1 instanceof NumberList);
    assert.ok(v1 instanceof _immutable.List);

    assert.equal(v0.size, 3);
    assert.equal(v1.size, 3);

    assert.deepEqual(v0.toArray(), [1, 2, 3]);
    assert.deepEqual(v1.toArray(), [2, 3, 4]);
  });

  (0, _test["default"])('maps records to any', function (assert) {
    var v0 = Points.of({ x: 1 }, { y: 2 }, { x: 3, y: 3 });
    var v1 = v0.map(function (_ref) {
      var x = _ref.x;
      var y = _ref.y;
      return { x: x + 1, y: y * y };
    });

    assert.ok(v0 instanceof Points);
    assert.notOk(v1 instanceof Points);
    assert.ok(v1 instanceof _immutable.List);
    assert.equal(v1[_typed.Typed.typeName](), 'Typed.List(Any)');

    assert.equal(v0.size, 3);
    assert.equal(v1.size, 3);

    assert.deepEqual(v0.toJSON(), [{ x: 1, y: 0 }, { x: 0, y: 2 }, { x: 3, y: 3 }]);

    assert.deepEqual(v1.toJSON(), [{ x: 2, y: 0 }, { x: 1, y: 4 }, { x: 4, y: 9 }]);
  });

  (0, _test["default"])('maps records to records', function (assert) {
    var v0 = Points.of({ x: 1 }, { y: 2 }, { x: 3, y: 3 });
    var v1 = v0.map(function (point) {
      return point.update('x', inc).update('y', inc);
    });

    assert.ok(v0 instanceof Points);
    assert.ok(v1 instanceof Points);
    assert.ok(v1 instanceof _immutable.List);

    assert.equal(v0.size, 3);
    assert.equal(v1.size, 3);

    assert.deepEqual(v0.toJSON(), [{ x: 1, y: 0 }, { x: 0, y: 2 }, { x: 3, y: 3 }]);

    assert.deepEqual(v1.toJSON(), [{ x: 2, y: 1 }, { x: 1, y: 3 }, { x: 4, y: 4 }]);
  });

  (0, _test["default"])('filters values', function (assert) {
    var v0 = NumberList.of(1, 2, 3, 4, 5, 6);
    var v1 = v0.filter(isEvent);

    assert.ok(v0 instanceof NumberList);
    assert.ok(v1 instanceof NumberList);

    assert.equal(v0.size, 6);
    assert.equal(v1.size, 3);

    assert.deepEqual(v0.toArray(), [1, 2, 3, 4, 5, 6]);
    assert.deepEqual(v1.toArray(), [2, 4, 6]);
  });

  (0, _test["default"])('reduces values', function (assert) {
    var v = NumberList.of(1, 10, 100);

    assert.equal(v.reduce(sum), 111);
    assert.equal(v.reduce(sum, 1000), 1111);

    assert.ok(v instanceof NumberList);
    assert.deepEqual(v.toArray(), [1, 10, 100]);
  });

  (0, _test["default"])('reduces from the right', function (assert) {
    var v = StringList.of('a', 'b', 'c');

    assert.equal(v.reduceRight(concat), 'cba');
    assert.equal(v.reduceRight(concat, 'seeded'), 'seededcba');

    assert.ok(v instanceof StringList);
    assert.deepEqual(v.toArray(), ['a', 'b', 'c']);
  });

  (0, _test["default"])('takes and skips values', function (assert) {
    var v0 = NumberList.of(1, 2, 3, 4, 5, 6);
    var v1 = v0.skip(2);
    var v2 = v1.take(2);

    assert.ok(v0 instanceof NumberList);
    assert.ok(v1 instanceof NumberList);
    assert.ok(v2 instanceof NumberList);

    assert.equal(v0.size, 6);
    assert.equal(v1.size, 4);
    assert.equal(v2.size, 2);

    assert.deepEqual(v0.toArray(), [1, 2, 3, 4, 5, 6]);
    assert.deepEqual(v1.toArray(), [3, 4, 5, 6]);
    assert.deepEqual(v2.toArray(), [3, 4]);
  });

  (0, _test["default"])('efficiently chains array methods', function (assert) {
    var v = NumberList.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);

    assert.equal(v.filter(function (x) {
      return x % 2 == 0;
    }).skip(2).map(function (x) {
      return x * x;
    }).take(3).reduce(function (a, b) {
      return a + b;
    }, 0), 200);

    assert.ok(v instanceof NumberList);
    assert.equal(v.size, 14);
    assert.deepEqual(v.toArray(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
  });

  (0, _test["default"])('convert to map', function (assert) {
    var v = StringList.of("a", "b", "c");
    var m = v.toMap();

    assert.ok(v instanceof StringList);
    assert.equal(v.size, 3);
    assert.deepEqual(v.toArray(), ["a", "b", "c"]);

    assert.equal(m.size, 3);
    assert.equal(m.get(1), "b");
  });

  (0, _test["default"])('reverses', function (assert) {
    var v0 = StringList.of("a", "b", "c");
    var v1 = v0.reverse();

    assert.ok(v0 instanceof StringList);
    assert.ok(v1 instanceof StringList);

    assert.equal(v0.size, 3);
    assert.equal(v1.size, 3);

    assert.deepEqual(v0.toArray(), ["a", "b", "c"]);
    assert.deepEqual(v1.toArray(), ["c", "b", "a"]);
  });

  (0, _test["default"])('ensures equality', function (assert) {
    // Make a sufficiently long list.
    var array = Array(100).join('abcdefghijklmnopqrstuvwxyz').split('');

    var v1 = StringList(array);
    var v2 = StringList(array);

    assert.ok(v1 != v2);
    assert.ok(v1.equals(v2));
  });

  (0, _test["default"])('concat works like Array.prototype.concat', function (assert) {
    var v1 = NumberList.of(1, 2, 3);
    var v2 = v1.concat(4, NumberList.of(5, 6), [7, 8], _immutable.Seq({ a: 9, b: 10 }), _immutable.Set.of(11, 12));

    assert.ok(v1 instanceof NumberList);
    assert.ok(v2 instanceof NumberList);

    assert.equal(v1.size, 3);
    assert.equal(v2.size, 12);

    assert.deepEqual(v1.toArray(), [1, 2, 3]);
    assert.deepEqual(v2.toArray(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  (0, _test["default"])('allows chained mutations', function (assert) {
    var v1 = NumberList();
    var v2 = v1.push(1);
    var v3 = v2.withMutations(function (v) {
      return v.push(2).push(3).push(4);
    });
    var v4 = v3.push(5);

    assert.ok(v1 instanceof NumberList);
    assert.ok(v2 instanceof NumberList);
    assert.ok(v3 instanceof NumberList);
    assert.ok(v4 instanceof NumberList);

    assert.equal(v1.size, 0);
    assert.equal(v2.size, 1);
    assert.equal(v3.size, 4);
    assert.equal(v4.size, 5);

    assert.deepEqual(v1.toArray(), []);
    assert.deepEqual(v2.toArray(), [1]);
    assert.deepEqual(v3.toArray(), [1, 2, 3, 4]);
    assert.deepEqual(v4.toArray(), [1, 2, 3, 4, 5]);
  });

  (0, _test["default"])('allows chained mutations using alternative API', function (assert) {
    var v1 = NumberList();
    var v2 = v1.push(1);
    var v3 = v2.asMutable().push(2).push(3).push(4).asImmutable();
    var v4 = v3.push(5);

    assert.ok(v1 instanceof NumberList);
    assert.ok(v2 instanceof NumberList);
    assert.ok(v3 instanceof NumberList);
    assert.ok(v4 instanceof NumberList);

    assert.equal(v1.size, 0);
    assert.equal(v2.size, 1);
    assert.equal(v3.size, 4);
    assert.equal(v4.size, 5);

    assert.deepEqual(v1.toArray(), []);
    assert.deepEqual(v2.toArray(), [1]);
    assert.deepEqual(v3.toArray(), [1, 2, 3, 4]);
    assert.deepEqual(v4.toArray(), [1, 2, 3, 4, 5]);
  });

  (0, _test["default"])('allows size to be set', function (assert) {
    var input = _immutable.Range(0, 2000);
    var v1 = NumberList(input);
    var v2 = v1.setSize(1000);
    assert.throws(function (_) {
      return v2.setSize(1500);
    }, /setSize may only downsize/);
    var v3 = v2.setSize(1000);

    assert.ok(v1 instanceof NumberList);
    assert.ok(v2 instanceof NumberList);
    assert.ok(v3 instanceof NumberList);

    assert.equal(v1.size, 2000);
    assert.equal(v2.size, 1000);
    assert.equal(v3.size, 1000);

    assert.equal(v1.get(900), 900);
    assert.equal(v1.get(1300), 1300);
    assert.equal(v1.get(1800), 1800);

    assert.equal(v2.get(900), 900);
    assert.equal(v2.get(1300), void 0);
    assert.equal(v2.get(1800), void 0);

    assert.equal(v3.get(900), 900);
    assert.equal(v3.get(1300), void 0);
    assert.equal(v3.get(1800), void 0);

    assert.ok(v2.equals(v3));
  });

  (0, _test["default"])('can be efficiently sliced', function (assert) {
    var input = _immutable.Range(0, 2000);
    var v1 = NumberList(input);
    var v2 = v1.slice(100, -100);

    assert.ok(v1 instanceof NumberList);
    assert.ok(v2 instanceof NumberList);

    assert.equal(v1.size, 2000);
    assert.equal(v2.size, 1800);

    assert.equal(v2.first(), 100);
    assert.equal(v2.rest().size, 1799);
    assert.equal(v2.last(), 1899);
    assert.equal(v2.butLast().size, 1799);
  });

  var identity = function identity(x) {
    return x;
  };
  (0, _test["default"])('identity preserved on no redundunt changes', function (assert) {
    var ps = Points([{ x: 1 }, { y: 20 }, { x: 3, y: 5 }]);

    assert.equal(ps, ps.set(0, ps.first()));
    assert.equal(ps, ps.set(1, ps.get(1)));
    assert.equal(ps, ps.set(2, ps.get(2)));

    assert.equal(ps.setIn([0, 'x'], 1), ps);
    assert.equal(ps.setIn([0, 'y'], 0), ps);
    assert.equal(ps.setIn([1, 'x'], 0), ps);
    assert.equal(ps.setIn([1, 'y'], 20), ps);
    assert.equal(ps.setIn([2, 'x'], 3), ps);
    assert.equal(ps.setIn([2, 'y'], 5), ps);

    assert.equal(ps.mergeIn([0], { x: 1 }), ps);
    assert.equal(ps.mergeIn([0], { y: 0 }), ps);
    assert.equal(ps.mergeIn([0], { x: 1, y: 0 }), ps);
    assert.equal(ps.mergeIn([1], { x: 0 }), ps);
    assert.equal(ps.mergeIn([1], { y: 20 }), ps);
    assert.equal(ps.mergeIn([1], { x: 0, y: 20 }), ps);
    assert.equal(ps.mergeIn([2], { x: 3 }), ps);
    assert.equal(ps.mergeIn([2], { y: 5 }), ps);
    assert.equal(ps.mergeIn([2], { x: 3, y: 5 }), ps);
  });

  (0, _test["default"])('empty list optimization', function (assert) {
    assert.equal(Points(), Points());
    assert.equal(Points(void 0), Points());
    assert.equal(Points(null), Points());
    assert.equal(Points([]), Points());
    assert.notEqual(Points([Point({ x: 1 })]), Points());
    assert.equal(Points([Point({ x: 1 })]).clear(), Points());
    assert.equal(Points([Point({ x: 1 })]).clear(), Points([Point({ x: 1 }), Point({ y: 2 })]).clear());
  });
});