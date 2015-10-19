(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./test", "immutable", "../record", "../typed"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./test"), require("immutable"), require("../record"), require("../typed"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.test, global.Immutable, global.record, global.typed);
    global.index = mod.exports;
  }
})(this, function (exports, _test, _immutable, _record, _typed) {
  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

  (0, _test["default"])("define a constructor", function (assert) {
    var MyType = (0, _record.Record)({ a: Number(1),
      b: Number(2),
      c: Number(3) });

    var t1 = new MyType();
    var t2 = t1.set("a", 10);
    var t3 = t2.clear();

    assert.ok(t1 instanceof _record.Record);
    assert.ok(t1 instanceof MyType);

    assert.ok(t3 instanceof _record.Record);
    assert.ok(t3 instanceof MyType);

    assert.equal(t1.get("a"), 1);
    assert.equal(t2.get("a"), 10);

    assert.equal(t1.size, 3);
    assert.equal(t2.size, 3);
  });

  (0, _test["default"])("passes through records of the same type", function (assert) {
    var P2 = (0, _record.Record)({ x: Number(0), y: Number(0) });
    var P3 = (0, _record.Record)({ x: Number(0), y: Number(0), z: Number(0) });
    var p2 = P2();
    var p3 = P3();
    assert.ok(P3(p2) instanceof P3);
    assert.ok(P2(p3) instanceof P2);
    assert.equal(P2(p2), p2);
    assert.equal(P3(p3), p3);
  });

  (0, _test["default"])("only allows setting what it knows about", function (assert) {
    var MyType = (0, _record.Record)({ a: Number(1),
      b: Number(2),
      c: Number(3) });

    var t1 = new MyType({ a: 10, b: 20 });
    assert.throws(function (_) {
      return t1.set("d", 4);
    }, /Cannot set unknown field "d"/);
  });

  (0, _test["default"])("has a fixed size and falls back to default values", function (assert) {
    var MyType = (0, _record.Record)({ a: Number(1),
      b: Number(2),
      c: Number(3) });

    var t1 = new MyType({ a: 10, b: 20 });
    var t2 = new MyType({ b: 20 });
    var t3 = t1.remove("a");
    var t4 = t3.clear();

    assert.equal(t1.size, 3);
    assert.equal(t2.size, 3);
    assert.equal(t3.size, 3);
    assert.equal(t4.size, 3);

    assert.equal(t1.get("a"), 10);
    assert.equal(t2.get("a"), 1);
    assert.equal(t3.get("a"), 1);
    assert.equal(t4.get("b"), 2);

    assert.ok(t2.equals(t3));
    assert.notOk(t2.equals(t4));
    assert.ok(t4.equals(new MyType()));
  });

  (0, _test["default"])("converts sequences to records", function (assert) {
    var MyType = (0, _record.Record)({ a: 1, b: 2, c: 3 });
    var seq = _immutable.Seq({ a: 10, b: 20 });
    var t = new MyType(seq);
    assert.deepEqual(t.toObject(), { a: 10, b: 20, c: 3 });
  });

  (0, _test["default"])("allows for functional construction", function (assert) {
    var MyType = (0, _record.Record)({ a: 1, b: 2, c: 3 });
    var seq = _immutable.Seq({ a: 10, b: 20 });
    var t = MyType(seq);
    assert.deepEqual(t.toObject(), { a: 10, b: 20, c: 3 });
  });

  (0, _test["default"])("skips unknown keys", function (assert) {
    var MyType = (0, _record.Record)({ a: 1, b: 2 });
    var seq = _immutable.Seq({ b: 20, c: 30 });
    var t = new MyType(seq);

    assert.equal(t.get("a"), 1);
    assert.equal(t.get("b"), 20);
    assert.equal(t.get("c"), void 0);
  });

  (0, _test["default"])("flat record with defaults values", function (assert) {
    var Point = (0, _record.Record)({
      x: Number(0),
      y: Number(0)
    }, "Point");

    var p1 = Point();

    assert.equal(p1.x, 0);
    assert.equal(p1.y, 0);
    assert.equal(JSON.stringify(p1), JSON.stringify({ x: 0, y: 0 }));

    var p2 = Point({ x: 10 });

    assert.equal(p2.x, 10);
    assert.equal(p2.y, 0);
    assert.equal(JSON.stringify(p2), JSON.stringify({ x: 10, y: 0 }));

    var p3 = Point({ x: 1, y: 2 });

    assert.equal(p3.x, 1);
    assert.equal(p3.y, 2);
    assert.equal(JSON.stringify(p3), JSON.stringify({ x: 1, y: 2 }));
  });

  (0, _test["default"])("ignores unknown fields", function (assert) {
    var Point = (0, _record.Record)({
      x: Number(0),
      y: Number(0)
    }, "Point");

    var p1 = Point({ z: 20 });

    assert.equal(p1.z, void 0);
    assert.equal(JSON.stringify(p1), JSON.stringify({ x: 0, y: 0 }));
  });

  (0, _test["default"])("invalid argument passed to a record", function (assert) {
    var Point = (0, _record.Record)({
      x: Number(0),
      y: Number(0)
    }, "Point");

    assert.throws(function () {
      Point(null);
    }, /Invalid data structure "null"/);

    assert.throws(function () {
      Point(7);
    }, /Invalid data structure "7"/);

    assert.throws(function () {
      Point(true);
    }, /Invalid data structure "true"/);

    assert.throws(function () {
      Point("{x: 1}");
    }, /Invalid data structure "{x: 1}"/);
  });

  (0, _test["default"])("flat record without defaults", function (assert) {
    var Point = (0, _record.Record)({
      x: Number,
      y: Number
    }, "Point");

    assert.throws(function () {
      Point();
    }, /Invalid value for "x" field/);

    assert.throws(function () {
      Point({ x: 1 });
    }, /Invalid value for "y" field/);

    var p1 = Point({ x: 0, y: 1 });

    assert.equal(p1.x, 0);
    assert.equal(p1.y, 1);
  });

  (0, _test["default"])("stringify on record", function (assert) {
    var UnlabledPoint = (0, _record.Record)({ x: Number, y: Number });

    assert.equal(UnlabledPoint({ x: 0, y: 0 })[_typed.Typed.typeName](), "Typed.Record({x: Number, y: Number})");

    assert.equal(UnlabledPoint({ x: 4, y: 9 }) + "", "Typed.Record({x: Number, y: Number})({ \"x\": 4, \"y\": 9 })");

    var LabledPoint = (0, _record.Record)({ x: Number, y: Number }, "Point");

    assert.equal(LabledPoint({ x: 0, y: 0 })[_typed.Typed.typeName](), "Point");

    assert.equal(LabledPoint({ x: 4, y: 9 }) + "", "Point({ \"x\": 4, \"y\": 9 })");

    var PointDefaults = (0, _record.Record)({ x: Number(0), y: Number(7) });

    assert.equal(PointDefaults({ x: 5, y: 3 })[_typed.Typed.typeName](), "Typed.Record({x: Number(0), y: Number(7)})");

    assert.equal(PointDefaults({ x: 4, y: 9 }) + "", "Typed.Record({x: Number(0), y: Number(7)})({ \"x\": 4, \"y\": 9 })");

    var LabledPointDefaults = (0, _record.Record)({ x: Number(5), y: Number(9) }, "Point");

    assert.equal(LabledPointDefaults({ x: 0, y: 0 })[_typed.Typed.typeName](), "Point");

    assert.equal(LabledPointDefaults({ x: 4, y: 9 }) + "", "Point({ \"x\": 4, \"y\": 9 })");
  });

  (0, _test["default"])("nested records", function (assert) {
    var Point = (0, _record.Record)({ x: Number(0), y: Number(0) }, "Point");
    var Line = (0, _record.Record)({ begin: Point, end: Point }, "Line");

    assert.equal(Line() + "", "Line({ \"begin\": Point({ \"x\": 0, \"y\": 0 }), \"end\": Point({ \"x\": 0, \"y\": 0 }) })");

    assert.equal(Line({ begin: { x: 5 } }) + "", "Line({ \"begin\": Point({ \"x\": 5, \"y\": 0 }), \"end\": Point({ \"x\": 0, \"y\": 0 }) })");

    assert.equal(Line({ begin: { x: 5 }, end: { y: 7 } }) + "", "Line({ \"begin\": Point({ \"x\": 5, \"y\": 0 }), \"end\": Point({ \"x\": 0, \"y\": 7 }) })");

    var l1 = Line({ begin: { x: 5 }, end: { y: 7 } });

    assert.ok(Line(JSON.parse(JSON.stringify(l1))).equals(l1));

    assert.throws(function () {
      Line({ begin: { x: 5 }, end: null });
    }, /Invalid value for "end" field/);

    assert.throws(function () {
      Line({ begin: { x: 5 }, end: { y: "7" } });
    }, /Invalid value for "y" field/);
  });

  (0, _test["default"])("defines a constructor", function (assert) {
    var Point = (0, _record.Record)({ x: Number(0),
      y: Number(0) });

    var p1 = new Point();
    var p2 = p1.set("x", 10);

    assert.equal(p1.x, 0);
    assert.equal(p2.x, 10);
  });

  (0, _test["default"])("can have mutations apply", function (assert) {
    var Point = (0, _record.Record)({ x: Number(0),
      y: Number(0) });

    var p = new Point();

    assert.throws(function (_) {
      return p.x = 10;
    }, /Cannot set on an immutable record/);

    var p2 = p.withMutations(function (m) {
      m.x = 10;
      m.y = 20;
    });

    assert.equal(p2.x, 10, "x was updated");
    assert.equal(p2.y, 20, "y was updated");
  });

  (0, _test["default"])("can be subclassed", function (assert) {
    var Alphabet = (function (_Record) {
      _inherits(Alphabet, _Record);

      function Alphabet() {
        _classCallCheck(this, Alphabet);

        _get(Object.getPrototypeOf(Alphabet.prototype), "constructor", this).apply(this, arguments);
      }

      _createClass(Alphabet, [{
        key: "soup",
        value: function soup() {
          return this.a + this.b + this.c;
        }
      }]);

      return Alphabet;
    })((0, _record.Record)({ a: Number(1),
      b: Number(2),
      c: Number(3) }));

    var t = new Alphabet();
    var t2 = t.set("b", 200);

    assert.ok(t instanceof _record.Record);
    assert.ok(t instanceof Alphabet);
    assert.equal(t.soup(), 6);

    assert.ok(t2 instanceof _record.Record);
    assert.ok(t2 instanceof Alphabet);
    assert.equal(t2.soup(), 204);
  });

  (0, _test["default"])("short-circuits if already a record", function (assert) {
    var Point = (0, _record.Record)({ x: Number(0), y: Number(0) });
    var p = new Point({ x: 1, y: 2 });

    assert.equal(p, Point(p));
    assert.equal(p, new Point(p));

    var OtherPoint = (0, _record.Record)({ x: Number(0), y: Number(0) });

    assert.notEqual(p, OtherPoint(p));
    assert.ok(p.equals(OtherPoint(p)));
    assert.notEqual(p, new OtherPoint(p));
    assert.ok(p.equals(new OtherPoint(p)));
    assert.equal(OtherPoint(p).x, 1);
    assert.equal(OtherPoint(p).y, 2);

    var SubPoint = (function (_Point) {
      _inherits(SubPoint, _Point);

      function SubPoint() {
        _classCallCheck(this, SubPoint);

        _get(Object.getPrototypeOf(SubPoint.prototype), "constructor", this).apply(this, arguments);
      }

      _createClass(SubPoint, [{
        key: "stringify",
        value: function stringify() {
          return this.x + ":" + this.y;
        }
      }]);

      return SubPoint;
    })(Point);

    assert.notEqual(p, new SubPoint(p));
    assert.ok(p.equals(new SubPoint(p)));

    assert.equal(new SubPoint(p).stringify(), "1:2");
  });

  (0, _test["default"])("can be cleared", function (assert) {
    var Point = (0, _record.Record)({ x: Number(1), y: Number(2) });
    var p = Point({ y: 20 });

    assert.equal(p.x, 1);
    assert.equal(p.y, 20);

    var pc = p.clear();

    assert.equal(pc.x, 1);
    assert.equal(pc.y, 2);
  });

  (0, _test["default"])("can not be cleared when no defaults", function (assert) {
    var Point = (0, _record.Record)({ x: Number, y: Number });
    var p = Point({ x: 1, y: 1 });

    assert.equal(p.x, 1);
    assert.equal(p.y, 1);

    assert.throws(function (_) {
      return p.clear();
    }, /Invalid value for "x" field/);
  });

  (0, _test["default"])("can construct sub-records", function (assert) {
    var Field = (0, _record.Record)({
      value: String(""),
      isFocused: Boolean(false)
    });

    var Login = (0, _record.Record)({
      user: Field,
      password: Field
    });

    var l1 = Login();

    assert.ok(l1.user instanceof Field);
    assert.ok(l1.password instanceof Field);
    assert.ok(l1.user.value === "");
    assert.ok(l1.user.isFocused === false);
    assert.ok(l1.password.value === "");
    assert.ok(l1.password.isFocused === false);

    assert.ok(l1.equals(new Login()));

    var l2 = Login({ user: { value: "gozala" } });

    assert.ok(l2.user instanceof Field);
    assert.ok(l2.password instanceof Field);
    assert.ok(l2.user.value === "gozala");
    assert.ok(l2.user.isFocused === false);
    assert.ok(l2.password.value === "");
    assert.ok(l2.password.isFocused === false);

    var l3 = Login({ user: { value: "gozala" },
      password: { isFocused: true },
      extra: { isFocused: false } });

    assert.ok(l3.user instanceof Field);
    assert.ok(l3.password instanceof Field);
    assert.ok(l3.user.value === "gozala");
    assert.ok(l3.user.isFocused === false);
    assert.ok(l3.password.value === "");
    assert.ok(l3.password.isFocused === true);
    assert.ok(l2.extra === undefined);
  });

  (0, _test["default"])("can update sub-records", function (assert) {
    var Field = (0, _record.Record)({
      value: String(""),
      isFocused: Boolean(false)
    });

    var Login = (0, _record.Record)({
      user: Field,
      password: Field
    });

    var l1 = Login();
    assert.ok(l1.user instanceof Field);
    assert.ok(l1.password instanceof Field);
    assert.ok(l1.user.value === "");
    assert.ok(l1.user.isFocused === false);
    assert.ok(l1.password.value === "");
    assert.ok(l1.password.isFocused === false);

    var l2 = l1.set("user", { value: "gozala" });
    assert.ok(l2.user instanceof Field);
    assert.ok(l2.password instanceof Field);
    assert.ok(l2.user.value === "gozala");
    assert.ok(l2.user.isFocused === false);
    assert.ok(l2.password.value === "");
    assert.ok(l2.password.isFocused === false);

    var l3 = l1.updateIn(["user"], function (_) {
      return { value: "updateIn" };
    });
    assert.ok(l3.user instanceof Field);
    assert.ok(l3.password instanceof Field);
    assert.ok(l3.user.value === "updateIn");
    assert.ok(l3.user.isFocused === false);
    assert.ok(l3.password.value === "");
    assert.ok(l3.password.isFocused === false);

    var l4 = l2.set("user", void 0);
    assert.ok(l4.user instanceof Field);
    assert.ok(l4.password instanceof Field);
    assert.ok(l4.user.value === "");
    assert.ok(l4.user.isFocused === false);
    assert.ok(l4.password.value === "");
    assert.ok(l4.password.isFocused === false);

    var l5 = l1.merge({ user: { value: "merge" } });
    assert.ok(l5.user instanceof Field);
    assert.ok(l5.password instanceof Field);
    assert.ok(l5.user.value === "merge");
    assert.ok(l5.user.isFocused === false);
    assert.ok(l5.password.value === "");
    assert.ok(l5.password.isFocused === false);
  });

  (0, _test["default"])("can use instances as fields", function (assert) {
    var Field = (0, _record.Record)({ isFocused: false,
      value: "" });

    var Login = (0, _record.Record)({ user: Field({ isFocused: true }),
      password: Field });

    var l1 = Login();

    assert.ok(l1.user instanceof Field, 'l1.user is Field instance');
    assert.ok(l1.password instanceof Field, 'l1.password is Field instance');
    assert.ok(l1.user.value === "", 'l1.user.value is ""');
    assert.ok(l1.user.isFocused === true, 'l1.user.isFocused is true');
    assert.ok(l1.password.value === "", 'l1.password.value is ""');
    assert.ok(l1.password.isFocused === false, 'l1.password.isFocused is false');

    var l2 = Login({ user: { isFocused: false, value: "gozala" },
      password: { isFocused: true } });

    assert.ok(l2.user instanceof Field);
    assert.ok(l2.password instanceof Field);
    assert.ok(l2.user.value === "gozala");
    assert.ok(l2.user.isFocused === false);
    assert.ok(l2.password.value === "");
    assert.ok(l2.password.isFocused === true);
  });

  (0, _test["default"])("Maybe type", function (assert) {
    assert.throws(function () {
      (0, _typed.Maybe)({});
    }, /is not a valid/);

    var InputModel = (0, _record.Record)({
      value: (0, _typed.Maybe)(String)
    }, "InputModel");

    assert.equal(InputModel() + "", "InputModel({ \"value\": null })");

    assert.equal(JSON.stringify(InputModel()), JSON.stringify({ value: null }));

    assert.equal(JSON.stringify(InputModel({})), JSON.stringify({ value: null }));

    assert.equal(JSON.stringify(InputModel({ value: null })), JSON.stringify({ value: null }));

    assert.equal(JSON.stringify(InputModel({ value: void 0 })), JSON.stringify({ value: null }));

    assert.throws(function (_) {
      return InputModel({ value: 17 });
    }, /"17" is not nully/);
    assert.throws(function (_) {
      return InputModel({ value: 17 });
    }, /nor it is of String type/);

    var i1 = InputModel({ value: "hello" });

    assert.equal(i1.value, "hello");
    assert.equal(JSON.stringify(i1), JSON.stringify({ value: "hello" }));
    assert.equal(i1 + "", "InputModel({ \"value\": \"hello\" })");
  });

  (0, _test["default"])("Range type", function (assert) {
    var Color = (0, _record.Record)({
      red: _typed.Typed.Number.Range(0, 255, 0),
      green: _typed.Typed.Number.Range(0, 255, 0),
      blue: _typed.Typed.Number.Range(0, 255, 0),
      alpha: (0, _typed.Maybe)(_typed.Typed.Number.Range(0, 100))
    }, "Color");

    assert.equal(Color() + "", "Color({ \"red\": 0, \"green\": 0, \"blue\": 0, \"alpha\": null })");

    assert.throws(function (_) {
      return Color({ alpha: -10 });
    }, /"-10" is not nully/);
    assert.throws(function (_) {
      return Color({ alpha: -10 });
    }, /of Typed.Number.Range\(0\.\.100\) type/);

    assert.equal(Color({ alpha: 20 }) + "", "Color({ \"red\": 0, \"green\": 0, \"blue\": 0, \"alpha\": 20 })");
  });

  (0, _test["default"])("Union type", function (assert) {
    var Status = (0, _record.Record)({
      readyState: (0, _typed.Union)(Number, String)
    });

    assert.throws(function (_) {
      return Status();
    }, /"undefined" does not satisfy Union\(Number, String\)/);

    assert.equal(Status({ readyState: "loading" }).toString(), "Typed.Record({readyState: Union(Number, String)})({ \"readyState\": \"loading\" })");
  });

  (0, _test["default"])("Union of similar records", function (assert) {
    var Add = (0, _record.Record)({ id: Number(0) });
    var Remove = (0, _record.Record)({ id: Number(0) });
    var Action = (0, _record.Record)({ action: (0, _typed.Union)(Add, Remove) });

    var add = Add();
    var remove = Remove();
    var ambigius = { id: 1 };

    assert.equal(Action({ action: add }).action, add, "recognizes Add");
    assert.equal(Action({ action: remove }).action, remove, "recognizes Remove");
    assert.ok(Action({ action: ambigius }).action instanceof Add, "matches Add");
  });
});