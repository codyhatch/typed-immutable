(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'immutable'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('immutable'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Immutable);
    global.typed = mod.exports;
  }
})(this, function (exports, _immutable) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

  if (typeof Symbol === 'undefined') {
    var Symbol = function Symbol(hint) {
      return '@@' + hint;
    };
    Symbol['for'] = Symbol;
  }

  function Construct() {}
  var construct = function construct(value) {
    Construct.prototype = value.constructor.prototype;
    return new Construct();
  };

  exports.construct = construct;
  var $type = Symbol['for']("typed/type");
  var $store = Symbol['for']("typed/store");
  var $empty = Symbol['for']("typed/empty");

  var $maybe = Symbol['for']("typed/type/maybe");
  var $default = Symbol['for']("typed/type/default");
  var $label = Symbol['for']("typed/type/label");

  var $init = Symbol['for']("transducer/init");
  var $result = Symbol['for']("transducer/result");
  var $step = Symbol['for']("transducer/step");
  var $read = Symbol['for']("typed/type/read");
  var $parse = Symbol['for']("typed/type/parse");
  var $typeName = Symbol("typed/type/name");
  var $typeSignature = Symbol("typed/type/signature");

  var Typed = function Typed(label, parse, defaultValue) {
    var ValueType = (function (_Type) {
      _inherits(ValueType, _Type);

      function ValueType(defaultValue) {
        _classCallCheck(this, ValueType);

        _get(Object.getPrototypeOf(ValueType.prototype), 'constructor', this).call(this);
        this[$default] = defaultValue;
      }

      return ValueType;
    })(Type);

    var prototype = ValueType.prototype;
    prototype[$default] = defaultValue;
    prototype[$parse] = parse;
    prototype[$label] = label;

    var TypedValue = function TypedValue(defaultValue) {
      return defaultValue === void 0 ? prototype : new ValueType(defaultValue);
    };
    TypedValue.prototype = prototype;

    return TypedValue;
  };

  exports.Typed = Typed;
  Typed.label = $label;
  Typed.defaultValue = $default;
  Typed.read = $read;
  Typed.typeName = $typeName;
  Typed.typeSignature = $typeSignature;

  Typed.type = $type;
  Typed.store = $store;
  Typed.init = $init;
  Typed.result = $result;
  Typed.step = $step;
  Typed.DELETE = "delete";
  Typed.empty = $empty;

  var typeName = function typeName(type) {
    return type[$typeName]();
  };
  var typeSignature = function typeSignature(type) {
    return type[$typeSignature]();
  };

  var Type = (function () {
    function Type() {
      _classCallCheck(this, Type);
    }

    _createClass(Type, [{
      key: Typed.read,
      value: function value() {
        var _value = arguments.length <= 0 || arguments[0] === undefined ? this[$default] : arguments[0];

        return this[$parse](_value);
      }
    }, {
      key: Typed.parse,
      value: function value(_value2) {
        throw TypeError('Type implementation must implement "[read.symbol]" method');
      }
    }, {
      key: Typed.typeName,
      value: function value() {
        var label = this[$label];
        var defaultValue = this[$default];
        return defaultValue === void 0 ? label : label + '(' + JSON.stringify(defaultValue) + ')';
      }
    }]);

    return Type;
  })();

  exports.Type = Type;

  var ObjectPrototype = Object.prototype;

  // Returns `true` if given `x` is a JS array.
  var isArray = Array.isArray || function (x) {
    return ObjectPrototype.toString.call(x) === '[object Array]';
  };

  // Returns `true` if given `x` is a regular expression.
  var isRegExp = function isRegExp(x) {
    return ObjectPrototype.toString.call(x) === '[object RegExp]';
  };

  var typeOf = function typeOf(x) {
    var type = arguments.length <= 1 || arguments[1] === undefined ? typeof x : arguments[1];
    return (function () {
      return x === void 0 ? x : x === null ? x : x[$read] ? x : x.prototype && x.prototype[$read] ? x.prototype : type === "number" ? new Typed.Number(x) : type === "string" ? new Typed.String(x) : type === "boolean" ? new Typed.Boolean(x) : type === "symbol" ? new Typed.Symbol(x) : isArray(x) ? Typed.Array(x) : isRegExp(x) ? new Typed.RegExp(x) : x === String ? Typed.String.prototype : x === Number ? Typed.Number.prototype : x === Boolean ? Typed.Boolean.prototype : x === RegExp ? Typed.RegExp.prototype : x === Array ? Typed.Array.prototype : x === Symbol ? Typed.Symbol.prototype : x === Date ? Typed.Date.prototype : Any;
    })();
  };

  exports.typeOf = typeOf;
  var Any = Typed("Any", function (value) {
    return value;
  })();
  exports.Any = Any;
  Typed.Any = Any;

  Typed.Number = Typed("Number", function (value) {
    return typeof value === "number" ? value : TypeError('"' + value + '" is not a number');
  });

  Typed.String = Typed("String", function (value) {
    return typeof value === "string" ? value : TypeError('"' + value + '" is not a string');
  });

  Typed.Symbol = Typed("Symbol", function (value) {
    return typeof value === "symbol" ? value : TypeError('"' + value + '" is not a symbol');
  });

  Typed.Array = Typed("Array", function (value) {
    return isArray(value) ? value : TypeError('"' + value + '" is not an array');
  });

  Typed.RegExp = Typed("RegExp", function (value) {
    return value instanceof RegExp ? value : TypeError('"' + value + '" is not a regexp');
  });

  Typed.Boolean = Typed("Boolean", function (value) {
    return value === true ? true : value === false ? false : TypeError('"' + value + '" is not a boolean');
  });

  Typed.Date = Typed("Date", function (value) {
    if (Object.prototype.toString.call(value) === "[object Date]") {
      return value;
    } else if (typeof value === "string") {
      return new Date(value);
    }
    return TypeError('"' + value + '" is not a date or string');
  });

  var MaybeType = (function (_Type2) {
    _inherits(MaybeType, _Type2);

    function MaybeType(type) {
      _classCallCheck(this, MaybeType);

      _get(Object.getPrototypeOf(MaybeType.prototype), 'constructor', this).call(this);
      this[$type] = type;
    }

    _createClass(MaybeType, [{
      key: Typed.typeName,
      value: function value() {
        return 'Maybe(' + this[$type][$typeName]() + ')';
      }
    }, {
      key: Typed.read,
      value: function value(_value3) {
        var result = _value3 == null ? null : this[$type][$read](_value3);

        return !(result instanceof TypeError) ? result : TypeError('"' + _value3 + '" is not nully nor it is of ' + this[$type][$typeName]() + ' type');
      }
    }]);

    return MaybeType;
  })(Type);

  var Maybe = function Maybe(Type) {
    var type = typeOf(Type);
    if (type === Any) {
      throw TypeError(Type + ' is not a valid type');
    }

    return type[$maybe] || (type[$maybe] = new MaybeType(type));
  };
  exports.Maybe = Maybe;
  Maybe.Type = MaybeType;

  var UnionType = (function (_Type3) {
    _inherits(UnionType, _Type3);

    function UnionType(variants) {
      _classCallCheck(this, UnionType);

      _get(Object.getPrototypeOf(UnionType.prototype), 'constructor', this).call(this);
      this[$type] = variants;
    }

    // Returns `xs` excluding any values that are included in `ys`.

    _createClass(UnionType, [{
      key: Typed.typeName,
      value: function value() {
        return 'Union(' + this[$type].map(typeName).join(', ') + ')';
      }
    }, {
      key: Typed.read,
      value: function value(_value4) {
        var variants = this[$type];
        var count = variants.length;
        var index = 0;
        while (index < count) {
          var variant = variants[index];
          if (_value4 instanceof variant.constructor) {
            return _value4;
          }
          index = index + 1;
        }

        index = 0;
        while (index < count) {
          var result = variants[index][$read](_value4);
          if (!(result instanceof TypeError)) {
            return result;
          }
          index = index + 1;
        }

        return TypeError('"' + _value4 + '" does not satisfy ' + this[$typeName]() + ' type');
      }
    }]);

    return UnionType;
  })(Type);

  var subtract = function subtract(xs, ys) {
    return xs.filter(function (x) {
      return ys.indexOf(x) < 0;
    });
  };

  // Returns array including all values from `xs` and all values from
  // `ys` that aren't already included in `xs`. It will also attempt
  // to return either `xs` or `ys` if one of them is a superset of other.
  // return `xs` or `ys` if
  var union = function union(xs, ys) {
    // xs can be superset only if it contains more items then
    // ys. If that's a case find items in ys that arent included
    // in xs. If such items do not exist return back `xs` otherwise
    // return concatination of xs with those items.
    // those items
    if (xs.length > ys.length) {
      var diff = subtract(ys, xs);
      return diff.length === 0 ? xs : xs.concat(diff);
    }
    // if number of items in xs is not greater than number of items in ys
    // then either xs is either subset or equal of `ys`. There for we find
    // ys that are not included in `xs` if such items aren't found ys is
    // either superset or equal so just return ys otherwise return concatination
    // of those items with `ys`.
    else {
        var diff = subtract(xs, ys);
        return diff.length === 0 ? ys : diff.concat(ys);
      }
  };

  var Union = function Union() {
    for (var _len = arguments.length, Types = Array(_len), _key = 0; _key < _len; _key++) {
      Types[_key] = arguments[_key];
    }

    var count = Types.length;

    if (count === 0) {
      throw TypeError('Union must be of at at least one type');
    }

    var variants = null;
    var type = null;
    var index = 0;
    while (index < count) {
      var variant = typeOf(Types[index]);
      // If there is `Any` present than union is also `Any`.
      if (variant === Any) {
        return Any;
      }
      // If this is the first type we met than we assume it's the
      // one that satisfies all types.
      if (!variants) {
        type = variant;
        variants = type instanceof UnionType ? type[$type] : [variant];
      } else if (variants.indexOf(variant) < 0) {
        // If current reader is of union type
        if (variant instanceof UnionType) {
          var variantUnion = union(variants, variant[$type]);

          // If `reader.readers` matches union of readers, then
          // current reader is a superset so we use it as a type
          // that satisfies all types.
          if (variantUnion === variant[$type]) {
            type = variant;
            variants = variantUnion;
          }
          // If current readers is not the union than it does not
          // satisfy currenty reader. There for we update readers
          // and unset a type.
          else if (variantUnion !== variants) {
              type = null;
              variants = variantUnion;
            }
        } else {
          type = null;
          variants.push(variant);
        }
      }

      index = index + 1;
    }

    return type ? type : new UnionType(variants);
  };
  exports.Union = Union;
  Union.Type = UnionType;

  Typed.Number.Range = function (from, to, defaultValue) {
    if (to === undefined) to = +Infinity;
    return Typed('Typed.Number.Range(' + from + '..' + to + ')', function (value) {
      if (typeof value !== 'number') {
        return TypeError('"' + value + '" is not a number');
      }

      if (!(value >= from && value <= to)) {
        return TypeError('"' + value + '" isn\'t in the range of ' + from + '..' + to);
      }

      return value;
    }, defaultValue);
  };
});