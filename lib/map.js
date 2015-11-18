(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./typed", "immutable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./typed"), require("immutable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.typed, global.Immutable);
    global.map = mod.exports;
  }
})(this, function (exports, _typed, _immutable) {
  "use strict";

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

  var ImmutableMap = _immutable.Map;
  var Keyed = _immutable.Iterable.Keyed;

  var $store = _typed.Typed.store;
  var $type = _typed.Typed.type;
  var $read = _typed.Typed.read;
  var $step = _typed.Typed.step;
  var $init = _typed.Typed.init;
  var $result = _typed.Typed.result;
  var $label = _typed.Typed.label;
  var $typeName = _typed.Typed.typeName;
  var $empty = _typed.Typed.empty;

  var EntryType = (function (_Type) {
    _inherits(EntryType, _Type);

    function EntryType(key, value, label) {
      _classCallCheck(this, EntryType);

      _get(Object.getPrototypeOf(EntryType.prototype), "constructor", this).call(this);
      this.key = key;
      this.value = value;
      this.label = label;
    }

    _createClass(EntryType, [{
      key: _typed.Typed.typeName,
      value: function value() {
        return this.label || this.key[$typeName]() + ", " + this.value[$typeName]();
      }
    }, {
      key: _typed.Typed.read,
      value: (function (_value) {
        function value(_x) {
          return _value.apply(this, arguments);
        }

        value.toString = function () {
          return _value.toString();
        };

        return value;
      })(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var key = _ref2[0];
        var value = _ref2[1];

        var keyResult = this.key[$read](key);
        if (keyResult instanceof TypeError) {
          return TypeError("Invalid key: " + keyResult.message);
        }

        var valueResult = this.value[$read](value);
        if (valueResult instanceof TypeError) {
          return TypeError("Invalid value: " + valueResult.message);
        }

        return [keyResult, valueResult];
      })
    }]);

    return EntryType;
  })(_typed.Type);

  var InferredEntryType = (function (_EntryType) {
    _inherits(InferredEntryType, _EntryType);

    function InferredEntryType() {
      _classCallCheck(this, InferredEntryType);

      _get(Object.getPrototypeOf(InferredEntryType.prototype), "constructor", this).call(this, key, value);
    }

    _createClass(InferredEntryType, [{
      key: "toStatic",
      value: function toStatic() {
        return new MapEntryType(this.key, this.value);
      }
    }, {
      key: _typed.Typed.typeName,
      value: function value() {
        var key = this.key ? this.key[$typeName]() : "TypeInferred";
        var value = this.value ? this.value[$typeName]() : "TypeInferred";
        return key + ", " + value;
      }
    }, {
      key: _typed.Typed.read,
      value: function value(entry) {
        // typeOf usually creates type for the value with that
        // value being a default. For type inference we should
        // actually use a base type instead of type with default
        // there for we use prototype of the constructor.
        var key = (0, _typed.typeOf)(entry[0]).constructor.prototype;
        this.key = this.key ? (0, _typed.Union)(this.key, key) : key;

        var value = (0, _typed.typeOf)(entry[1]).constructor.prototype;
        this.value = this.value ? (0, _typed.Union)(this.value, value) : value;

        return entry;
      }
    }]);

    return InferredEntryType;
  })(EntryType);

  var BaseImmutableMap = function BaseImmutableMap() {};
  BaseImmutableMap.prototype = _immutable.Map.prototype;

  var TypedMap = (function (_BaseImmutableMap) {
    _inherits(TypedMap, _BaseImmutableMap);

    function TypedMap(value) {
      _classCallCheck(this, TypedMap);

      _get(Object.getPrototypeOf(TypedMap.prototype), "constructor", this).call(this);
      return TypedMap.prototype[$read](value);
    }

    _createClass(TypedMap, [{
      key: "advance",
      value: function advance(store) {
        var result = store.__ownerID ? this : (0, _typed.construct)(this);
        result[$store] = store;
        result.size = store.size;
        result.__ownerID = store.__ownerID;
        return result;
      }
    }, {
      key: _typed.Typed.init,
      value: function value() {
        return this.advance(ImmutableMap()).asMutable();
      }
    }, {
      key: _typed.Typed.step,
      value: function value(state, entry) {
        var result = this[$type][$read](entry);

        if (result instanceof TypeError) {
          throw result;
        }

        var _result = _slicedToArray(result, 2);

        var key = _result[0];
        var value = _result[1];

        return state.advance(state[$store].set(key, value));
      }
    }, {
      key: _typed.Typed.result,
      value: function value(state) {
        return state.asImmutable();
      }
    }, {
      key: _typed.Typed.read,
      value: function value(structure) {
        var constructor = this.constructor;

        if (structure === null || structure === void 0) {
          if (!this[$empty]) {
            this[$empty] = this.advance(ImmutableMap());
          }

          return this[$empty];
        }

        var isInstance = structure instanceof constructor && structure.constructor === constructor;

        if (isInstance) {
          return structure;
        }

        var entries = Keyed(structure).entries();
        var type = this[$type];
        var state = this[$init]();

        while (true) {
          var _entries$next = entries.next();

          var done = _entries$next.done;
          var entry = _entries$next.value;

          if (done) {
            break;
          }

          var result = type[$read](entry);

          if (result instanceof TypeError) {
            return result;
          }

          state = state[$step](state, result);
        }

        return this[$result](state);
      }
    }, {
      key: _typed.Typed.typeName,
      value: function value() {
        return this[$label] || "Typed.Map(" + this[$type][$typeName]() + ")";
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.__toString(this[$typeName]() + '({', '})');
      }
    }, {
      key: "has",
      value: function has(key) {
        return this[$store].has(key);
      }
    }, {
      key: "get",
      value: function get(key, fallback) {
        return this[$store].get(key, fallback);
      }
    }, {
      key: "clear",
      value: function clear() {
        if (this.size === 0) {
          return this;
        }

        if (this.__ownerID) {
          return this.advance(this[$store].clear());
        }

        return this[$empty] || this[$read]();
      }
    }, {
      key: "remove",
      value: function remove(key) {
        return this.advance(this[$store].remove(key));
      }
    }, {
      key: "set",
      value: function set(key, value) {
        return this[$step](this, [key, value]);
      }
    }, {
      key: "wasAltered",
      value: function wasAltered() {
        return this[$store].wasAltered();
      }
    }, {
      key: "__ensureOwner",
      value: function __ensureOwner(ownerID) {
        var result = this.__ownerID === ownerID ? this : !ownerID ? this : (0, _typed.construct)(this);

        var store = this[$store].__ensureOwner(ownerID);
        result[$store] = store;
        result.size = store.size;
        result.__ownerID = ownerID;

        return result;
      }
    }, {
      key: "__iterator",
      value: function __iterator(type, reverse) {
        return this[$store].__iterator(type, reverse);
      }
    }, {
      key: "__iterate",
      value: function __iterate(f, reverse) {
        return this[$store].__iterate(f, reverse);
      }
    }]);

    return TypedMap;
  })(BaseImmutableMap);

  TypedMap.prototype[_typed.Typed.DELETE] = TypedMap.prototype.remove;

  var TypeInferredMap = (function (_TypedMap) {
    _inherits(TypeInferredMap, _TypedMap);

    function TypeInferredMap() {
      _classCallCheck(this, TypeInferredMap);

      _get(Object.getPrototypeOf(TypeInferredMap.prototype), "constructor", this).call(this);
    }

    _createClass(TypeInferredMap, [{
      key: _typed.Typed.init,
      value: function value() {
        var result = this.advance(ImmutableMap()).asMutable();
        result[$type] = new InferredEntryType();
        return result;
      }
    }, {
      key: _typed.Typed.result,
      value: function value(state) {
        var result = state.asImmutable();
        result[$type] = state[$type].toStatic();

        return result;
      }
    }]);

    return TypeInferredMap;
  })(TypedMap);

  var Map = function Map(keyDescriptor, valueDescriptor, label) {
    var _Object$create;

    if (keyDescriptor === void 0) {
      throw TypeError("Typed.Map must be passed a key type descriptor");
    }

    if (valueDescriptor === void 0) {
      throw TypeError("Typed.Map must be passed a value type descriptor");
    }

    // If both key and value types are Any this is just a plain immutable map.
    if (keyDescriptor === _typed.Any && valueDescriptor === _typed.Any) {
      return ImmutableMap;
    }

    var keyType = (0, _typed.typeOf)(keyDescriptor);
    var valueType = (0, _typed.typeOf)(valueDescriptor);

    if (keyType === _typed.Any && keyDescriptor !== _typed.Any) {
      throw TypeError("Typed.Map was passed an invalid key type descriptor: " + keyDescriptor);
    }

    if (valueType === _typed.Any && valueDescriptor !== _typed.Any) {
      throw TypeError("Typed.Map was passed an invalid value type descriptor: " + valueDescriptor);
    }

    var type = new EntryType(keyType, valueType, label);

    var MapType = function MapType(value) {
      var isThis = this instanceof MapType;
      var constructor = isThis ? this.constructor : MapType;

      if (value instanceof constructor) {
        return value;
      }

      var result = constructor.prototype[$read](value);

      if (result instanceof TypeError) {
        throw result;
      }

      var isCall = isThis && _typed.construct.prototype === this;

      if (!isCall && isThis) {
        this[$store] = result[$store];
        this.size = result.size;
      } else {
        return result;
      }

      return this;
    };
    MapType.prototype = Object.create(MapPrototype, (_Object$create = {
      constructor: { value: MapType }
    }, _defineProperty(_Object$create, $type, { value: type }), _defineProperty(_Object$create, $label, { value: label }), _Object$create));

    return MapType;
  };
  exports.Map = Map;
  Map.Type = TypedMap;
  Map.prototype = TypedMap.prototype;
  var MapPrototype = Map.prototype;
});