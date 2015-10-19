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
    global.record = mod.exports;
  }
})(this, function (exports, _test, _immutable, _record, _typed) {
  "use strict";

  var Point = (0, _record.Record)({
    x: Number(0),
    y: Number(0)
  }, "Point");

  (0, _test["default"])("reading record short-cirquits", function (assert) {
    var v = Point();
    var reader = (0, _typed.typeOf)(Point);

    assert.equal(reader[_typed.Typed.read](v), v);
  });

  (0, _test["default"])("reading records", function (assert) {
    var reader = (0, _typed.typeOf)(Point);

    var v1 = reader[_typed.Typed.read]();
    var v2 = reader[_typed.Typed.read]({ x: 10 });
    var v3 = reader[_typed.Typed.read]({ y: 10 });
    var v4 = reader[_typed.Typed.read]({ x: 1, y: 2 });

    assert.ok(v1 instanceof _record.Record);
    assert.ok(v2 instanceof _record.Record);
    assert.ok(v3 instanceof _record.Record);
    assert.ok(v4 instanceof _record.Record);

    assert.ok(v1 instanceof Point);
    assert.ok(v2 instanceof Point);
    assert.ok(v3 instanceof Point);
    assert.ok(v4 instanceof Point);

    assert.deepEqual(v1.toJSON(), { x: 0, y: 0 });
    assert.deepEqual(v2.toJSON(), { x: 10, y: 0 });
    assert.deepEqual(v3.toJSON(), { x: 0, y: 10 });
    assert.deepEqual(v4.toJSON(), { x: 1, y: 2 });
  });

  var identity = function identity(x) {
    return x;
  };
  (0, _test["default"])("identical on no change", function (assert) {
    var p1 = Point({ x: 5 });

    assert.equal(p1, p1.set('x', 5));
    assert.equal(p1, p1.merge({ x: 5 }));
    assert.equal(p1, p1.merge({ y: 0 }));
    assert.equal(p1, p1.merge({ x: 5, y: 0 }));
    assert.equal(p1, p1.remove('y'));
    assert.equal(p1, p1.update('x', identity));
    assert.equal(p1, p1.update('y', identity));
  });

  (0, _test["default"])("identical no change in deep updates", function (assert) {
    var Line = (0, _record.Record)({ start: Point, end: Point }, 'Line');

    var l1 = Line({ start: { x: 5 }, end: { x: 7, y: 2 } });

    assert.equal(l1, l1.set('start', l1.start));
    assert.equal(l1, l1.set('end', l1.end));

    assert.equal(l1, l1.merge({ start: l1.start }));
    assert.equal(l1, l1.merge({ end: l1.end }));
    assert.equal(l1, l1.merge({ start: l1.start, end: l1.end }));
    assert.equal(l1, l1.removeIn(['start', 'y']));
    assert.equal(l1, l1.setIn(['start', 'x'], 5));
    assert.equal(l1, l1.setIn(['start', 'x'], 5).setIn(['end', 'x'], 7));
    assert.equal(l1, l1.mergeIn(['start'], { x: 5 }));
    assert.equal(l1, l1.mergeIn(['start'], { x: 5, y: 0 }));
    assert.equal(l1, l1.mergeIn(['start'], { y: 0 }));
    assert.equal(l1, l1.mergeIn(['end'], { y: 2 }));
    assert.equal(l1, l1.mergeIn(['end'], { x: 7 }));
    assert.equal(l1, l1.mergeIn(['end'], { y: 2, x: 7 }));

    assert.equal(l1, l1.update('start', function (p) {
      return p.set('x', 5);
    }));
  });

  (0, _test["default"])('empty record optimization', function (assert) {
    var Point = (0, _record.Record)({ x: 0, y: 0 }, 'Point');

    assert.equal(Point(), Point());
    assert.notEqual(Point({ x: 1 }), Point());
    assert.equal(Point({ x: 1 }).clear(), Point());
    assert.equal(Point({ x: 1 }).clear(), Point({ y: 2 }).clear());
    assert.equal(Point({}), Point());
    assert.notEqual(Point({ z: 3 }), Point());
    assert.ok(Point({ z: 3 }).equals(Point()));
    assert.notEqual(Point({ x: 0 }), Point());
    assert.ok(Point({ x: 0 }).equals(Point()));
  });
});