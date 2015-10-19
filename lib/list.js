(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', './typed', 'immutable'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('./typed'), require('immutable'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.typed, global.Immutable);
    global.list = mod.exports;
  }
})(this, function (exports, _typed, _immutable) {
  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

  var ImmutableList = _immutable.List;
  var Indexed = _immutable.Iterable.Indexed;

  var $store = _typed.Typed.store;
  var $type = _typed.Typed.type;
  var $read = _typed.Typed.read;
  var $step = _typed.Typed.step;
  var $init = _typed.Typed.init;
  var $result = _typed.Typed.result;
  var $label = _typed.Typed.label;
  var $typeName = _typed.Typed.typeName;
  var $empty = _typed.Typed.empty;

  var change = function change(list, f) {
    var store = f(list[$store]);
    if (store === list[$store]) {
      return list;
    } else {
      var result = list.__ownerID ? list : (0, _typed.construct)(list);
      result[$store] = store;
      result.size = store.size;
      return result;
    }
  };

  var _clear = function _clear(target) {
    return target.clear();
  };
  var _pop = function _pop(target) {
    return target.pop();
  };
  var _shift = function _shift(target) {
    return target.shift();
  };

  var TypeInferer = (function (_Type) {
    _inherits(TypeInferer, _Type);

    function TypeInferer() {
      _classCallCheck(this, TypeInferer);

      _get(Object.getPrototypeOf(TypeInferer.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(TypeInferer, [{
      key: _typed.Typed.typeName,
      value: function value() {
        return 'TypeInferer';
      }
    }, {
      key: _typed.Typed.read,
      value: function value(_value) {
        // typeOf usually creates type for the value with that
        // value being a default. For type inference we should
        // actually use a base type instead of type with default
        // there for we use prototype of the constructor.
        var type = (0, _typed.typeOf)(_value).constructor.prototype;
        this.type = this.type ? (0, _typed.Union)(this.type, type) : type;
        return _value;
      }
    }]);

    return TypeInferer;
  })(_typed.Type);

  function BaseImmutableList() {}
  BaseImmutableList.prototype = ImmutableList.prototype;

  var TypeInferedList = (function (_BaseImmutableList) {
    _inherits(TypeInferedList, _BaseImmutableList);

    _createClass(TypeInferedList, null, [{
      key: 'from',
      value: function from(list) {
        var result = (0, _typed.construct)(this.prototype);
        result[$store] = list[$store];
        result.size = list.size;
        return result;
      }
    }]);

    function TypeInferedList(value) {
      _classCallCheck(this, TypeInferedList);

      _get(Object.getPrototypeOf(TypeInferedList.prototype), 'constructor', this).call(this);
      return TypeInferedList.prototype[$read](value);
    }

    _createClass(TypeInferedList, [{
      key: _typed.Typed.init,
      value: function value() {
        var result = (0, _typed.construct)(this).asMutable();
        result[$type] = new TypeInferer();
        return result;
      }
    }, {
      key: _typed.Typed.result,
      value: function value(result) {
        var list = result.asImmutable();
        list[$type] = result[$type].type;

        return list;
      }
    }, {
      key: _typed.Typed.read,
      value: function value(input) {
        var Type = this.constructor;

        if (input === null || input === void 0) {
          if (!this[$empty]) {
            var result = (0, _typed.construct)(this);
            result[$store] = ImmutableList();
            result.size = 0;
            this[$empty] = result;
          }

          return this[$empty];
        }

        if (input instanceof Type && input && input.constructor === Type) {
          return input;
        }

        var source = Indexed(input);
        var isEmpty = source.size === 0;

        if (isEmpty && this[$empty]) {
          return this[$empty];
        }

        var list = this[$init]();
        list.size = source.size;
        source.forEach(function (value, index) {
          list.set(index, value);
        });

        list = this[$result](list);

        if (isEmpty) {
          this[$empty] = list;
        }

        return list;
      }
    }, {
      key: _typed.Typed.step,
      value: function value(result, _ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var key = _ref2[0];
        var _value2 = _ref2[1];

        return change(result, function () {
          var store = arguments.length <= 0 || arguments[0] === undefined ? ImmutableList() : arguments[0];
          return store.set(key, _value2);
        });
      }
    }, {
      key: _typed.Typed.typeName,
      value: function value() {
        return this[$label] || 'Typed.List(' + this[$type][$typeName]() + ')';
      }
    }, {
      key: 'toString',
      value: function toString() {
        return this.__toString(this[$typeName]() + '([', '])');
      }
    }, {
      key: 'has',
      value: function has(key) {
        return this[$store].has(key);
      }
    }, {
      key: 'get',
      value: function get(index, notSetValue) {
        return this[$store] ? this[$store].get(index, notSetValue) : notSetValue;
      }
    }, {
      key: 'clear',
      value: function clear() {
        if (this.__ownerID) {
          return change(this, _clear);
        }

        return this[$empty] || this[$read]();
      }
    }, {
      key: 'remove',
      value: function remove(index) {
        return change(this, function (store) {
          return store && store.remove(index);
        });
      }
    }, {
      key: 'set',
      value: function set(index, value) {
        if (index > this.size) {
          throw TypeError('Index "' + index + '" is out of bound');
        }

        var result = this[$type][$read](value);

        if (result instanceof TypeError) {
          throw TypeError('Invalid value: ' + result.message);
        }

        return this[$step](this, [index, result]);
      }
    }, {
      key: 'push',
      value: function push() {
        var type = this[$type];
        var items = [];

        for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
          values[_key] = arguments[_key];
        }

        var count = values.length;
        var index = 0;
        while (index < count) {
          var value = values[index];
          var result = type[$read](value);

          if (result instanceof TypeError) {
            throw TypeError('Invalid value: ' + result.message);
          }

          items.push(result);
          index = index + 1;
        }

        return change(this, function (store) {
          return store ? store.push.apply(store, items) : ImmutableList.apply(undefined, items);
        });
      }
    }, {
      key: 'pop',
      value: function pop() {
        return change(this, _pop);
      }
    }, {
      key: 'unshift',
      value: function unshift() {
        var type = this[$type];
        var items = [];

        for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          values[_key2] = arguments[_key2];
        }

        var count = values.length;
        var index = 0;

        while (index < count) {
          var value = values[index];
          var result = type[$read](value);

          if (result instanceof TypeError) {
            throw TypeError('Invalid value: ' + result.message);
          }

          items.push(result);
          index = index + 1;
        }

        return change(this, function (store) {
          return store ? store.unshift.apply(store, items) : ImmutableList.apply(undefined, items);
        });
      }
    }, {
      key: 'shift',
      value: function shift() {
        return change(this, _shift);
      }
    }, {
      key: 'setSize',
      value: function setSize(size) {
        if (size > this.size) {
          throw TypeError('setSize may only downsize');
        }

        return change(this, function (store) {
          return store.setSize(size);
        });
      }
    }, {
      key: 'slice',
      value: function slice(begin, end) {
        return change(this, function (store) {
          return store && store.slice(begin, end);
        });
      }
    }, {
      key: 'wasAltered',
      value: function wasAltered() {
        return this[$store].wasAltered();
      }
    }, {
      key: '__ensureOwner',
      value: function __ensureOwner(ownerID) {
        var result = this.__ownerID === ownerID ? this : !ownerID ? this : (0, _typed.construct)(this);

        result.__ownerID = ownerID;
        result[$store] = this[$store] ? this[$store].__ensureOwner(ownerID) : ImmutableList().__ensureOwner(ownerID);
        result.size = result[$store].size;

        return result;
      }
    }, {
      key: '__iterator',
      value: function __iterator(type, reverse) {
        var _this = this;

        return Indexed(this[$store]).map(function (_, key) {
          return _this.get(key);
        }).__iterator(type, reverse);
      }
    }, {
      key: '__iterate',
      value: function __iterate(f, reverse) {
        var _this2 = this;

        return Indexed(this[$store]).map(function (_, key) {
          return _this2.get(key);
        }).__iterate(f, reverse);
      }
    }]);

    return TypeInferedList;
  })(BaseImmutableList);

  TypeInferedList.prototype[_typed.Typed.DELETE] = TypeInferedList.prototype.remove;

  var BaseTypeInferedList = function BaseTypeInferedList() {};
  BaseTypeInferedList.prototype = TypeInferedList.prototype;

  var TypedList = (function (_BaseTypeInferedList) {
    _inherits(TypedList, _BaseTypeInferedList);

    function TypedList() {
      _classCallCheck(this, TypedList);

      _get(Object.getPrototypeOf(TypedList.prototype), 'constructor', this).call(this);
    }

    _createClass(TypedList, [{
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
      key: 'map',
      value: function map(mapper, context) {
        if (this.size === 0) {
          return this;
        } else {
          var result = TypeInferedList.from(this).map(mapper, context);
          if (this[$store] === result[$store]) {
            return this;
          }
          if (result[$type] === this[$type]) {
            var list = (0, _typed.construct)(this);
            list[$store] = result[$store];
            list.size = result.size;
            return list;
          } else {
            return result;
          }
        }
      }
    }]);

    return TypedList;
  })(BaseTypeInferedList);

  var List = function List(descriptor, label) {
    var _Object$create;

    if (descriptor === void 0) {
      throw TypeError("Typed.List must be passed a type descriptor");
    }

    if (descriptor === _typed.Any) {
      return _immutable.List;
    }

    var type = (0, _typed.typeOf)(descriptor);

    if (type === _typed.Any) {
      throw TypeError("Typed.List was passed an invalid type descriptor: ${descriptor}");
    }

    var ListType = function ListType(value) {
      var isListType = this instanceof ListType;
      var Type = isListType ? this.constructor : ListType;

      if (value instanceof Type) {
        return value;
      }

      var result = Type.prototype[$read](value);

      if (result instanceof TypeError) {
        throw result;
      }

      // `list.map(f)` will in fact cause `list.constructor(items)` to be
      // invoked there for we need to check if `this[$store]` was
      // assigned to know if it's that or if it's a `new ListType()` call.
      if (isListType && !this[$store]) {
        this[$store] = result[$store];
        this.size = result.size;
      } else {
        return result;
      }

      return this;
    };
    ListType.of = ImmutableList.of;
    ListType.prototype = Object.create(ListPrototype, (_Object$create = {
      constructor: { value: ListType }
    }, _defineProperty(_Object$create, $type, { value: type }), _defineProperty(_Object$create, $label, { value: label }), _Object$create));

    return ListType;
  };
  exports.List = List;
  List.Type = TypedList;
  List.prototype = TypedList.prototype;
  var ListPrototype = TypedList.prototype;
});