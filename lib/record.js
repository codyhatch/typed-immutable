(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./typed", "immutable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./typed"), require("immutable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.typed, global.immutable);
    global.record = mod.exports;
  }
})(this, function (exports, _typed, _immutable) {
  "use strict";

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

  var Keyed = _immutable.Iterable.Keyed;

  var Getter = function Getter(key) {
    return function () {
      return this.get(key);
    };
  };

  var Setter = function Setter(key) {
    return function (value) {
      if (!this.__ownerID) {
        throw TypeError("Cannot set on an immutable record.");
      }
      this.set(key, value);
    };
  };

  var $store = _typed.Typed.store;
  var $type = _typed.Typed.type;
  var $step = _typed.Typed.step;
  var $init = _typed.Typed.init;
  var $result = _typed.Typed.result;
  var $read = _typed.Typed.read;
  var $label = _typed.Typed.label;
  var $empty = _typed.Typed.empty;
  var $typeName = _typed.Typed.typeName;
  var $typeSignature = _typed.Typed.typeSignature;

  var IterableKeyedBase = function IterableKeyedBase() {};
  IterableKeyedBase.prototype = _immutable.Iterable.Keyed.prototype;

  var TypedRecord = (function (_IterableKeyedBase) {
    _inherits(TypedRecord, _IterableKeyedBase);

    function TypedRecord() {
      _classCallCheck(this, TypedRecord);

      _get(Object.getPrototypeOf(TypedRecord.prototype), "constructor", this).call(this);
    }

    _createClass(TypedRecord, [{
      key: _typed.Typed.init,
      value: function value() {
        return (0, _typed.construct)(this).asMutable();
      }
    }, {
      key: _typed.Typed.result,
      value: function value(result) {
        return result.asImmutable();
      }
    }, {
      key: _typed.Typed.read,
      value: function value(structure) {
        var Type = this.constructor;

        if (structure instanceof Type && structure && structure.constructor === Type) {
          return structure;
        }

        if (structure === null || structure && typeof structure !== "object") {
          return TypeError("Invalid data structure \"" + structure + "\" was passed to " + this[$typeName]());
        }

        var seq = (0, _immutable.Seq)(structure);
        var type = this[$type];
        var isEmpty = seq.size === 0;

        if (isEmpty && this[$empty]) {
          return this[$empty];
        }

        var record = undefined;
        for (var key in type) {
          var fieldType = type[key];
          var value = seq.has(key) ? seq.get(key) : this.get(key);
          var result = fieldType[$read](value);

          if (result instanceof TypeError) {
            return TypeError("Invalid value for \"" + key + "\" field:\n " + result.message);
          }

          record = this[$step](record || this[$init](), [key, result]);
        }

        record = this[$result](record);

        if (isEmpty) {
          this[$empty] = record;
        }

        return record;
      }
    }, {
      key: _typed.Typed.step,
      value: function value(result, _ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var key = _ref2[0];
        var _value = _ref2[1];

        var store = result[$store] ? result[$store].set(key, _value) : new _immutable.Map([[key, _value]]);

        if (result[$store] === store) {
          return result;
        }

        var record = result.__ownerID ? result : (0, _typed.construct)(result);
        record[$store] = store;

        return record;
      }
    }, {
      key: _typed.Typed.typeSignature,
      value: function value() {
        var type = this[$type];
        var body = [];
        for (var key in type) {
          body.push(key + ": " + type[key][$typeName]());
        }

        return "Typed.Record({" + body.join(', ') + "})";
      }
    }, {
      key: _typed.Typed.typeName,
      value: function value() {
        return this[$label] || this[$typeSignature]();
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.__toString(this[$typeName]() + '({', '})');
      }
    }, {
      key: "has",
      value: function has(key) {
        return !!this[$type][key];
      }
    }, {
      key: "get",
      value: function get(key, defaultValue) {
        return !this[$type][key] ? defaultValue : !this[$store] ? defaultValue : this[$store].get(key, defaultValue);
      }
    }, {
      key: "clear",
      value: function clear() {
        if (this.__ownerID) {
          this[$store] && this[$store].clear();
          return this;
        }

        return this[$empty] || (this[$empty] = new this.constructor());
      }
    }, {
      key: "remove",
      value: function remove(key) {
        return this[$type][key] ? this.set(key, void 0) : this;
      }
    }, {
      key: "set",
      value: function set(key, value) {
        var fieldType = this[$type][key];

        if (!fieldType) {
          throw TypeError("Cannot set unknown field \"" + key + "\" on \"" + this[$typeName]() + "\"");
        }

        var result = fieldType[$read](value);

        if (result instanceof TypeError) {
          throw TypeError("Invalid value for " + key + " field: " + result.message);
        }

        return this[$step](this, [key, result]);
      }
    }, {
      key: "__iterator",
      value: function __iterator(type, reverse) {
        var _this = this;

        return Keyed(this[$type]).map(function (_, key) {
          return _this.get(key);
        }).__iterator(type, reverse);
      }
    }, {
      key: "__iterate",
      value: function __iterate(f, reverse) {
        var _this2 = this;

        return Keyed(this[$type]).map(function (_, key) {
          return _this2.get(key);
        }).__iterate(f, reverse);
      }
    }, {
      key: "__ensureOwner",
      value: function __ensureOwner(ownerID) {
        if (ownerID === this.__ownerID) {
          return this;
        }

        var store = this[$store] && this[$store].__ensureOwner(ownerID);
        var result = !ownerID ? this : (0, _typed.construct)(this);

        result.__ownerID = ownerID;
        result[$store] = store;
        return result;
      }
    }, {
      key: "wasAltered",
      value: function wasAltered() {
        return this[$store].wasAltered();
      }
    }]);

    return TypedRecord;
  })(IterableKeyedBase);

  var Record = function Record(descriptor, label) {
    if (descriptor && typeof descriptor === "object") {
      var type = Object.create(null);
      var _keys = Object.keys(descriptor);
      var size = _keys.length;

      if (size > 0) {
        var _properties;

        var _ret = (function () {
          var properties = (_properties = {
            size: { value: size }
          }, _defineProperty(_properties, $type, { value: type }), _defineProperty(_properties, $label, { value: label }), _properties);

          var index = 0;
          while (index < size) {
            var key = _keys[index];
            var fieldType = (0, _typed.typeOf)(descriptor[key]);

            if (fieldType) {
              type[key] = fieldType;
              properties[key] = { get: Getter(key), set: Setter(key), enumerable: true };
            } else {
              throw TypeError("Invalid field descriptor provided for a \"" + key + "\" field");
            }

            index = index + 1;
          }

          var RecordType = function RecordType(structure) {
            var isNew = this instanceof RecordType;
            var constructor = isNew ? this.constructor : RecordType;

            if (structure instanceof constructor) {
              return structure;
            }

            var type = constructor.prototype;
            var result = type[$read](structure);

            if (result instanceof TypeError) {
              throw result;
            }

            if (isNew) {
              this[$store] = result[$store];
            } else {
              return result;
            }
          };

          properties.constructor = { value: RecordType };
          RecordType.prototype = Object.create(RecordPrototype, properties);
          var prototype = RecordType.prototype;

          return {
            v: RecordType
          };
        })();

        if (typeof _ret === "object") return _ret.v;
      } else {
        throw TypeError("Typed.Record descriptor must define at least on field");
      }
    } else {
      throw TypeError("Typed.Record must be passed a descriptor of fields");
    }
  };
  exports.Record = Record;
  Record.Type = TypedRecord;
  Record.prototype = TypedRecord.prototype;
  var RecordPrototype = TypedRecord.prototype;

  RecordPrototype[_typed.Typed.DELETE] = RecordPrototype.remove;

  // Large part of the Record API is implemented by Immutabel.Map
  // and is just copied over.
  RecordPrototype.deleteIn = _immutable.Map.prototype.deleteIn;
  RecordPrototype.removeIn = _immutable.Map.prototype.removeIn;
  RecordPrototype.merge = _immutable.Map.prototype.merge;
  RecordPrototype.mergeWith = _immutable.Map.prototype.mergeWith;
  RecordPrototype.mergeIn = _immutable.Map.prototype.mergeIn;
  RecordPrototype.mergeDeep = _immutable.Map.prototype.mergeDeep;
  RecordPrototype.mergeDeepWith = _immutable.Map.prototype.mergeDeepWith;
  RecordPrototype.mergeDeepIn = _immutable.Map.prototype.mergeDeepIn;
  RecordPrototype.setIn = _immutable.Map.prototype.setIn;
  RecordPrototype.update = _immutable.Map.prototype.update;
  RecordPrototype.updateIn = _immutable.Map.prototype.updateIn;
  RecordPrototype.withMutations = _immutable.Map.prototype.withMutations;
  RecordPrototype.asMutable = _immutable.Map.prototype.asMutable;
  RecordPrototype.asImmutable = _immutable.Map.prototype.asImmutable;

  // Large chuck of API inherited from Iterable does not makes
  // much sense in the context of records so we undefine it.
  RecordPrototype.map = void 0;
  RecordPrototype.filter = void 0;
  RecordPrototype.filterNot = void 0;
  RecordPrototype.flip = void 0;
  RecordPrototype.mapKeys = void 0;
  RecordPrototype.mapEntries = void 0;
  RecordPrototype.sort = void 0;
  RecordPrototype.sortBy = void 0;
  RecordPrototype.reverse = void 0;
  RecordPrototype.slice = void 0;
  RecordPrototype.butLast = void 0;
  RecordPrototype.flatMap = void 0;
  RecordPrototype.flatten = void 0;
  RecordPrototype.rest = void 0;
  RecordPrototype.skip = void 0;
  RecordPrototype.skipLast = void 0;
  RecordPrototype.skipWhile = void 0;
  RecordPrototype.skipUntil = void 0;
  RecordPrototype.sortBy = void 0;
  RecordPrototype.take = void 0;
  RecordPrototype.takeLast = void 0;
  RecordPrototype.takeWhile = void 0;
  RecordPrototype.takeUntil = void 0;
});