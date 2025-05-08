(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, (global.CesiumNavigation = global.CesiumNavigation || {}, global.CesiumNavigation.umd = factory()));
}(this, (function () { 'use strict';

  var Cesium = window.Cesium;

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': fails,
    __moduleExports: fails
  });

  var fails$2 = ( fails$1 && fails ) || fails$1;

  var functionBindNative = !fails$2(function () {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function () { /* empty */ }).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var functionBindNative$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': functionBindNative,
    __moduleExports: functionBindNative
  });

  var NATIVE_BIND = ( functionBindNative$1 && functionBindNative ) || functionBindNative$1;

  var FunctionPrototype = Function.prototype;
  var call = FunctionPrototype.call;
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

  var functionUncurryThis = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
    return function () {
      return call.apply(fn, arguments);
    };
  };

  var functionUncurryThis$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': functionUncurryThis,
    __moduleExports: functionUncurryThis
  });

  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
  var documentAll = typeof document == 'object' && document.all;

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
  var isCallable = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
    return typeof argument == 'function' || argument === documentAll;
  } : function (argument) {
    return typeof argument == 'function';
  };

  var isCallable$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': isCallable,
    __moduleExports: isCallable
  });

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$2(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
  });

  var descriptors$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': descriptors,
    __moduleExports: descriptors
  });

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var check = function (it) {
    return it && it.Math === Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var globalThis_1 =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var globalThis$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': globalThis_1,
    __moduleExports: globalThis_1
  });

  var isCallable$2 = ( isCallable$1 && isCallable ) || isCallable$1;

  var isObject = function (it) {
    return typeof it == 'object' ? it !== null : isCallable$2(it);
  };

  var isObject$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': isObject,
    __moduleExports: isObject
  });

  var globalThis$2 = ( globalThis$1 && globalThis_1 ) || globalThis$1;

  var isObject$2 = ( isObject$1 && isObject ) || isObject$1;

  var document$1 = globalThis$2.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject$2(document$1) && isObject$2(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  var documentCreateElement$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': documentCreateElement,
    __moduleExports: documentCreateElement
  });

  var DESCRIPTORS = ( descriptors$1 && descriptors ) || descriptors$1;

  var documentCreateElement$2 = ( documentCreateElement$1 && documentCreateElement ) || documentCreateElement$1;

  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !DESCRIPTORS && !fails$2(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(documentCreateElement$2('div'), 'a', {
      get: function () { return 7; }
    }).a !== 7;
  });

  var ie8DomDefine$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': ie8DomDefine,
    __moduleExports: ie8DomDefine
  });

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = DESCRIPTORS && fails$2(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () { /* empty */ }, 'prototype', {
      value: 42,
      writable: false
    }).prototype !== 42;
  });

  var v8PrototypeDefineBug$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': v8PrototypeDefineBug,
    __moduleExports: v8PrototypeDefineBug
  });

  var $String = String;
  var $TypeError = TypeError;

  // `Assert: Type(argument) is Object`
  var anObject = function (argument) {
    if (isObject$2(argument)) return argument;
    throw new $TypeError($String(argument) + ' is not an object');
  };

  var anObject$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': anObject,
    __moduleExports: anObject
  });

  var call$1 = Function.prototype.call;
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var functionCall = NATIVE_BIND ? call$1.bind(call$1) : function () {
    return call$1.apply(call$1, arguments);
  };

  var functionCall$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': functionCall,
    __moduleExports: functionCall
  });

  var aFunction = function (argument) {
    return isCallable$2(argument) ? argument : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(globalThis$2[namespace]) : globalThis$2[namespace] && globalThis$2[namespace][method];
  };

  var getBuiltIn$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': getBuiltIn,
    __moduleExports: getBuiltIn
  });

  var uncurryThis = ( functionUncurryThis$1 && functionUncurryThis ) || functionUncurryThis$1;

  var objectIsPrototypeOf = uncurryThis({}.isPrototypeOf);

  var objectIsPrototypeOf$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': objectIsPrototypeOf,
    __moduleExports: objectIsPrototypeOf
  });

  var navigator = globalThis$2.navigator;
  var userAgent = navigator && navigator.userAgent;

  var environmentUserAgent = userAgent ? String(userAgent) : '';

  var environmentUserAgent$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': environmentUserAgent,
    __moduleExports: environmentUserAgent
  });

  var userAgent$1 = ( environmentUserAgent$1 && environmentUserAgent ) || environmentUserAgent$1;

  var process = globalThis$2.process;
  var Deno = globalThis$2.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && userAgent$1) {
    match = userAgent$1.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent$1.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var environmentV8Version = version;

  var environmentV8Version$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': environmentV8Version,
    __moduleExports: environmentV8Version
  });

  var V8_VERSION = ( environmentV8Version$1 && environmentV8Version ) || environmentV8Version$1;

  /* eslint-disable es/no-symbol -- required for testing */




  var $String$1 = globalThis$2.String;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$2(function () {
    var symbol = Symbol('symbol detection');
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
    // of course, fail.
    return !$String$1(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION && V8_VERSION < 41;
  });

  var symbolConstructorDetection$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': symbolConstructorDetection,
    __moduleExports: symbolConstructorDetection
  });

  var NATIVE_SYMBOL = ( symbolConstructorDetection$1 && symbolConstructorDetection ) || symbolConstructorDetection$1;

  /* eslint-disable es/no-symbol -- required for testing */


  var useSymbolAsUid = NATIVE_SYMBOL &&
    !Symbol.sham &&
    typeof Symbol.iterator == 'symbol';

  var useSymbolAsUid$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': useSymbolAsUid,
    __moduleExports: useSymbolAsUid
  });

  var getBuiltIn$2 = ( getBuiltIn$1 && getBuiltIn ) || getBuiltIn$1;

  var isPrototypeOf = ( objectIsPrototypeOf$1 && objectIsPrototypeOf ) || objectIsPrototypeOf$1;

  var USE_SYMBOL_AS_UID = ( useSymbolAsUid$1 && useSymbolAsUid ) || useSymbolAsUid$1;

  var $Object = Object;

  var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$2('Symbol');
    return isCallable$2($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
  };

  var isSymbol$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': isSymbol,
    __moduleExports: isSymbol
  });

  var $String$2 = String;

  var tryToString = function (argument) {
    try {
      return $String$2(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var tryToString$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': tryToString,
    __moduleExports: tryToString
  });

  var tryToString$2 = ( tryToString$1 && tryToString ) || tryToString$1;

  var $TypeError$1 = TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable = function (argument) {
    if (isCallable$2(argument)) return argument;
    throw new $TypeError$1(tryToString$2(argument) + ' is not a function');
  };

  var aCallable$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': aCallable,
    __moduleExports: aCallable
  });

  // we can't use just `it == null` since of `document.all` special case
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
  var isNullOrUndefined = function (it) {
    return it === null || it === undefined;
  };

  var isNullOrUndefined$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': isNullOrUndefined,
    __moduleExports: isNullOrUndefined
  });

  var aCallable$2 = ( aCallable$1 && aCallable ) || aCallable$1;

  var isNullOrUndefined$2 = ( isNullOrUndefined$1 && isNullOrUndefined ) || isNullOrUndefined$1;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod = function (V, P) {
    var func = V[P];
    return isNullOrUndefined$2(func) ? undefined : aCallable$2(func);
  };

  var getMethod$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': getMethod,
    __moduleExports: getMethod
  });

  var call$2 = ( functionCall$1 && functionCall ) || functionCall$1;

  var $TypeError$2 = TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$2(fn = input.toString) && !isObject$2(val = call$2(fn, input))) return val;
    if (isCallable$2(fn = input.valueOf) && !isObject$2(val = call$2(fn, input))) return val;
    if (pref !== 'string' && isCallable$2(fn = input.toString) && !isObject$2(val = call$2(fn, input))) return val;
    throw new $TypeError$2("Can't convert object to primitive value");
  };

  var ordinaryToPrimitive$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': ordinaryToPrimitive,
    __moduleExports: ordinaryToPrimitive
  });

  var isPure = false;

  var isPure$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': isPure,
    __moduleExports: isPure
  });

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty = Object.defineProperty;

  var defineGlobalProperty = function (key, value) {
    try {
      defineProperty(globalThis$2, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      globalThis$2[key] = value;
    } return value;
  };

  var defineGlobalProperty$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': defineGlobalProperty,
    __moduleExports: defineGlobalProperty
  });

  var IS_PURE = ( isPure$1 && isPure ) || isPure$1;

  var defineGlobalProperty$2 = ( defineGlobalProperty$1 && defineGlobalProperty ) || defineGlobalProperty$1;

  var sharedStore = createCommonjsModule(function (module) {




  var SHARED = '__core-js_shared__';
  var store = module.exports = globalThis$2[SHARED] || defineGlobalProperty$2(SHARED, {});

  (store.versions || (store.versions = [])).push({
    version: '3.42.0',
    mode: IS_PURE ? 'pure' : 'global',
    copyright: '© 2014-2025 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.42.0/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });
  });

  var sharedStore$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': sharedStore,
    __moduleExports: sharedStore
  });

  var shared = ( sharedStore$1 && sharedStore ) || sharedStore$1;

  var shared$1 = function (key, value) {
    return shared[key] || (shared[key] = value || {});
  };

  var shared$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': shared$1,
    __moduleExports: shared$1
  });

  var $TypeError$3 = TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (isNullOrUndefined$2(it)) throw new $TypeError$3("Can't call method on " + it);
    return it;
  };

  var requireObjectCoercible$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': requireObjectCoercible,
    __moduleExports: requireObjectCoercible
  });

  var requireObjectCoercible$2 = ( requireObjectCoercible$1 && requireObjectCoercible ) || requireObjectCoercible$1;

  var $Object$1 = Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject = function (argument) {
    return $Object$1(requireObjectCoercible$2(argument));
  };

  var toObject$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': toObject,
    __moduleExports: toObject
  });

  var toObject$2 = ( toObject$1 && toObject ) || toObject$1;

  var hasOwnProperty = uncurryThis({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es/no-object-hasown -- safe
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$2(it), key);
  };

  var hasOwnProperty$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': hasOwnProperty_1,
    __moduleExports: hasOwnProperty_1
  });

  var id = 0;
  var postfix = Math.random();
  var toString = uncurryThis(1.0.toString);

  var uid = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
  };

  var uid$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': uid,
    __moduleExports: uid
  });

  var shared$3 = ( shared$2 && shared$1 ) || shared$2;

  var hasOwn = ( hasOwnProperty$1 && hasOwnProperty_1 ) || hasOwnProperty$1;

  var uid$2 = ( uid$1 && uid ) || uid$1;

  var Symbol$1 = globalThis$2.Symbol;
  var WellKnownSymbolsStore = shared$3('wks');
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$2;

  var wellKnownSymbol = function (name) {
    if (!hasOwn(WellKnownSymbolsStore, name)) {
      WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol$1, name)
        ? Symbol$1[name]
        : createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
  };

  var wellKnownSymbol$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': wellKnownSymbol,
    __moduleExports: wellKnownSymbol
  });

  var isSymbol$2 = ( isSymbol$1 && isSymbol ) || isSymbol$1;

  var getMethod$2 = ( getMethod$1 && getMethod ) || getMethod$1;

  var ordinaryToPrimitive$2 = ( ordinaryToPrimitive$1 && ordinaryToPrimitive ) || ordinaryToPrimitive$1;

  var wellKnownSymbol$2 = ( wellKnownSymbol$1 && wellKnownSymbol ) || wellKnownSymbol$1;

  var $TypeError$4 = TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$2('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive = function (input, pref) {
    if (!isObject$2(input) || isSymbol$2(input)) return input;
    var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$2(exoticToPrim, input, pref);
      if (!isObject$2(result) || isSymbol$2(result)) return result;
      throw new $TypeError$4("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive$2(input, pref);
  };

  var toPrimitive$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': toPrimitive,
    __moduleExports: toPrimitive
  });

  var toPrimitive$2 = ( toPrimitive$1 && toPrimitive ) || toPrimitive$1;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey = function (argument) {
    var key = toPrimitive$2(argument, 'string');
    return isSymbol$2(key) ? key : key + '';
  };

  var toPropertyKey$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': toPropertyKey,
    __moduleExports: toPropertyKey
  });

  var IE8_DOM_DEFINE = ( ie8DomDefine$1 && ie8DomDefine ) || ie8DomDefine$1;

  var V8_PROTOTYPE_DEFINE_BUG = ( v8PrototypeDefineBug$1 && v8PrototypeDefineBug ) || v8PrototypeDefineBug$1;

  var anObject$2 = ( anObject$1 && anObject ) || anObject$1;

  var toPropertyKey$2 = ( toPropertyKey$1 && toPropertyKey ) || toPropertyKey$1;

  var $TypeError$5 = TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  var f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
    anObject$2(O);
    P = toPropertyKey$2(P);
    anObject$2(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    } return $defineProperty(O, P, Attributes);
  } : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$2(O);
    P = toPropertyKey$2(P);
    anObject$2(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$5('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f
  };

  var objectDefineProperty$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': objectDefineProperty,
    __moduleExports: objectDefineProperty,
    f: f
  });

  var FunctionPrototype$1 = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

  var EXISTS$1 = hasOwn(FunctionPrototype$1, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS$1 && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE$1 = EXISTS$1 && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype$1, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS$1,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE$1
  };
  var functionName_1 = functionName.EXISTS;
  var functionName_2 = functionName.PROPER;
  var functionName_3 = functionName.CONFIGURABLE;

  var functionName$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': functionName,
    __moduleExports: functionName,
    EXISTS: functionName_1,
    PROPER: functionName_2,
    CONFIGURABLE: functionName_3
  });

  var functionToString = uncurryThis(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$2(shared.inspectSource)) {
    shared.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource = shared.inspectSource;

  var inspectSource$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': inspectSource,
    __moduleExports: inspectSource
  });

  var WeakMap = globalThis$2.WeakMap;

  var weakMapBasicDetection = isCallable$2(WeakMap) && /native code/.test(String(WeakMap));

  var weakMapBasicDetection$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': weakMapBasicDetection,
    __moduleExports: weakMapBasicDetection
  });

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var createPropertyDescriptor$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': createPropertyDescriptor,
    __moduleExports: createPropertyDescriptor
  });

  var definePropertyModule = ( objectDefineProperty$1 && objectDefineProperty ) || objectDefineProperty$1;

  var createPropertyDescriptor$2 = ( createPropertyDescriptor$1 && createPropertyDescriptor ) || createPropertyDescriptor$1;

  var createNonEnumerableProperty = DESCRIPTORS ? function (object, key, value) {
    return definePropertyModule.f(object, key, createPropertyDescriptor$2(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var createNonEnumerableProperty$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': createNonEnumerableProperty,
    __moduleExports: createNonEnumerableProperty
  });

  var keys = shared$3('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid$2(key));
  };

  var sharedKey$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': sharedKey,
    __moduleExports: sharedKey
  });

  var hiddenKeys = {};

  var hiddenKeys$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': hiddenKeys,
    __moduleExports: hiddenKeys
  });

  var NATIVE_WEAK_MAP = ( weakMapBasicDetection$1 && weakMapBasicDetection ) || weakMapBasicDetection$1;

  var createNonEnumerableProperty$2 = ( createNonEnumerableProperty$1 && createNonEnumerableProperty ) || createNonEnumerableProperty$1;

  var sharedKey$2 = ( sharedKey$1 && sharedKey ) || sharedKey$1;

  var hiddenKeys$2 = ( hiddenKeys$1 && hiddenKeys ) || hiddenKeys$1;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$1 = globalThis$2.TypeError;
  var WeakMap$1 = globalThis$2.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
        throw new TypeError$1('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared.state) {
    var store = shared.state || (shared.state = new WeakMap$1());
    /* eslint-disable no-self-assign -- prototype methods protection */
    store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */
    set = function (it, metadata) {
      if (store.has(it)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      store.set(it, metadata);
      return metadata;
    };
    get = function (it) {
      return store.get(it) || {};
    };
    has = function (it) {
      return store.has(it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$2[STATE] = true;
    set = function (it, metadata) {
      if (hasOwn(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$2(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwn(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwn(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };
  var internalState_1 = internalState.set;
  var internalState_2 = internalState.get;
  var internalState_3 = internalState.has;
  var internalState_4 = internalState.enforce;
  var internalState_5 = internalState.getterFor;

  var internalState$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': internalState,
    __moduleExports: internalState,
    set: internalState_1,
    get: internalState_2,
    has: internalState_3,
    enforce: internalState_4,
    getterFor: internalState_5
  });

  var require$$0 = ( functionName$1 && functionName ) || functionName$1;

  var inspectSource$2 = ( inspectSource$1 && inspectSource ) || inspectSource$1;

  var InternalStateModule = ( internalState$1 && internalState ) || internalState$1;

  var makeBuiltIn_1 = createCommonjsModule(function (module) {





  var CONFIGURABLE_FUNCTION_NAME = require$$0.CONFIGURABLE;



  var enforceInternalState = InternalStateModule.enforce;
  var getInternalState = InternalStateModule.get;
  var $String = String;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty = Object.defineProperty;
  var stringSlice = uncurryThis(''.slice);
  var replace = uncurryThis(''.replace);
  var join = uncurryThis([].join);

  var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails$2(function () {
    return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
  });

  var TEMPLATE = String(String).split('String');

  var makeBuiltIn = module.exports = function (value, name, options) {
    if (stringSlice($String(name), 0, 7) === 'Symbol(') {
      name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
    }
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
      else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
      defineProperty(value, 'length', { value: options.arity });
    }
    try {
      if (options && hasOwn(options, 'constructor') && options.constructor) {
        if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
      // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
      } else if (value.prototype) value.prototype = undefined;
    } catch (error) { /* empty */ }
    var state = enforceInternalState(value);
    if (!hasOwn(state, 'source')) {
      state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
    } return value;
  };

  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  // eslint-disable-next-line no-extend-native -- required
  Function.prototype.toString = makeBuiltIn(function toString() {
    return isCallable$2(this) && getInternalState(this).source || inspectSource$2(this);
  }, 'toString');
  });

  var makeBuiltIn = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': makeBuiltIn_1,
    __moduleExports: makeBuiltIn_1
  });

  var makeBuiltIn$1 = ( makeBuiltIn && makeBuiltIn_1 ) || makeBuiltIn;

  var defineBuiltIn = function (O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable$2(value)) makeBuiltIn$1(value, name, options);
    if (options.global) {
      if (simple) O[key] = value;
      else defineGlobalProperty$2(key, value);
    } else {
      try {
        if (!options.unsafe) delete O[key];
        else if (O[key]) simple = true;
      } catch (error) { /* empty */ }
      if (simple) O[key] = value;
      else definePropertyModule.f(O, key, {
        value: value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
    } return O;
  };

  var defineBuiltIn$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': defineBuiltIn,
    __moduleExports: defineBuiltIn
  });

  var defineBuiltIn$2 = ( defineBuiltIn$1 && defineBuiltIn ) || defineBuiltIn$1;

  // TODO: Remove from `core-js@4`



  var DatePrototype = Date.prototype;
  var INVALID_DATE = 'Invalid Date';
  var TO_STRING = 'toString';
  var nativeDateToString = uncurryThis(DatePrototype[TO_STRING]);
  var thisTimeValue = uncurryThis(DatePrototype.getTime);

  // `Date.prototype.toString` method
  // https://tc39.es/ecma262/#sec-date.prototype.tostring
  if (String(new Date(NaN)) !== INVALID_DATE) {
    defineBuiltIn$2(DatePrototype, TO_STRING, function toString() {
      var value = thisTimeValue(this);
      // eslint-disable-next-line no-self-compare -- NaN check
      return value === value ? nativeDateToString(this) : INVALID_DATE;
    });
  }

  var TO_STRING_TAG = wellKnownSymbol$2('toStringTag');
  var test = {};

  test[TO_STRING_TAG] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var toStringTagSupport$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': toStringTagSupport,
    __moduleExports: toStringTagSupport
  });

  var toString$1 = uncurryThis({}.toString);
  var stringSlice = uncurryThis(''.slice);

  var classofRaw = function (it) {
    return stringSlice(toString$1(it), 8, -1);
  };

  var classofRaw$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': classofRaw,
    __moduleExports: classofRaw
  });

  var TO_STRING_TAG_SUPPORT = ( toStringTagSupport$1 && toStringTagSupport ) || toStringTagSupport$1;

  var classof = ( classofRaw$1 && classofRaw ) || classofRaw$1;

  var TO_STRING_TAG$1 = wellKnownSymbol$2('toStringTag');
  var $Object$2 = Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classof(function () { return arguments; }()) === 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$1 = TO_STRING_TAG_SUPPORT ? classof : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = $Object$2(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classof(O)
      // ES3 arguments fallback
      : (result = classof(O)) === 'Object' && isCallable$2(O.callee) ? 'Arguments' : result;
  };

  var classof$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': classof$1,
    __moduleExports: classof$1
  });

  var classof$3 = ( classof$2 && classof$1 ) || classof$2;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
    return '[object ' + classof$3(this) + ']';
  };

  var objectToString$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': objectToString,
    __moduleExports: objectToString
  });

  var toString$2 = ( objectToString$1 && objectToString ) || objectToString$1;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    defineBuiltIn$2(Object.prototype, 'toString', toString$2, { unsafe: true });
  }

  var $String$3 = String;

  var toString_1 = function (argument) {
    if (classof$3(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
    return $String$3(argument);
  };

  var toString$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': toString_1,
    __moduleExports: toString_1
  });

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags = function () {
    var that = anObject$2(this);
    var result = '';
    if (that.hasIndices) result += 'd';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.unicodeSets) result += 'v';
    if (that.sticky) result += 'y';
    return result;
  };

  var regexpFlags$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': regexpFlags,
    __moduleExports: regexpFlags
  });

  var regExpFlags = ( regexpFlags$1 && regexpFlags ) || regexpFlags$1;

  var RegExpPrototype = RegExp.prototype;

  var regexpGetFlags = function (R) {
    var flags = R.flags;
    return flags === undefined && !('flags' in RegExpPrototype) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype, R)
      ? call$2(regExpFlags, R) : flags;
  };

  var regexpGetFlags$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': regexpGetFlags,
    __moduleExports: regexpGetFlags
  });

  var $toString = ( toString$3 && toString_1 ) || toString$3;

  var getRegExpFlags = ( regexpGetFlags$1 && regexpGetFlags ) || regexpGetFlags$1;

  var PROPER_FUNCTION_NAME = require$$0.PROPER;






  var TO_STRING$1 = 'toString';
  var RegExpPrototype$1 = RegExp.prototype;
  var nativeToString = RegExpPrototype$1[TO_STRING$1];

  var NOT_GENERIC = fails$2(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name !== TO_STRING$1;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    defineBuiltIn$2(RegExpPrototype$1, TO_STRING$1, function toString() {
      var R = anObject$2(this);
      var pattern = $toString(R.source);
      var flags = $toString(getRegExpFlags(R));
      return '/' + pattern + '/' + flags;
    }, { unsafe: true });
  }

  var createFragmentFromTemplate = function createFragmentFromTemplate(htmlString) {
    var holder = document.createElement('div');
    holder.innerHTML = htmlString;
    var fragment = document.createDocumentFragment();
    while (holder.firstChild) {
      fragment.appendChild(holder.firstChild);
    }
    return fragment;
  };

  /* eslint-disable no-unused-vars */
  var getElement = Cesium.getElement;
  var Knockout = Cesium.knockout;
  var loadView = function loadView(htmlString, container, viewModel) {
    container = getElement(container);
    var fragment = createFragmentFromTemplate(htmlString);
    var nodes = [];
    var i;
    for (i = 0; i < fragment.childNodes.length; ++i) {
      nodes.push(fragment.childNodes[i]);
    }
    container.appendChild(fragment);
    for (i = 0; i < nodes.length; ++i) {
      var node = nodes[i];
      if (node.nodeType === 1 || node.nodeType === 8) {
        Knockout.applyBindings(viewModel, node);
      }
    }
    return nodes;
  };

  var defined = Cesium.defined;
  var DeveloperError = Cesium.DeveloperError;
  var EllipsoidGeodesic = Cesium.EllipsoidGeodesic;
  var Cartesian2 = Cesium.Cartesian2;
  var getTimestamp = Cesium.getTimestamp;
  var EventHelper = Cesium.EventHelper;
  var Knockout$1 = Cesium.knockout;
  var DistanceLegendViewModel = function DistanceLegendViewModel(options) {
    if (!defined(options) || !defined(options.terria)) {
      throw new DeveloperError('options.terria is required.');
    }
    this.terria = options.terria;
    this._removeSubscription = undefined;
    this._lastLegendUpdate = undefined;
    this.eventHelper = new EventHelper();
    this.distanceLabel = undefined;
    this.barWidth = undefined;
    this.enableDistanceLegend = defined(options.enableDistanceLegend) ? options.enableDistanceLegend : true;
    Knockout$1.track(this, ['distanceLabel', 'barWidth']);
    this.eventHelper.add(this.terria.afterWidgetChanged, function () {
      if (defined(this._removeSubscription)) {
        this._removeSubscription();
        this._removeSubscription = undefined;
      }
    }, this);
    //        this.terria.beforeWidgetChanged.addEventListener(function () {
    //            if (defined(this._removeSubscription)) {
    //                this._removeSubscription();
    //                this._removeSubscription = undefined;
    //            }
    //        }, this);

    var that = this;
    function addUpdateSubscription() {
      if (defined(that.terria)) {
        var scene = that.terria.scene;
        that._removeSubscription = scene.postRender.addEventListener(function () {
          updateDistanceLegendCesium(this, scene);
        }, that);
      }
    }
    addUpdateSubscription();
    this.eventHelper.add(this.terria.afterWidgetChanged, function () {
      addUpdateSubscription();
    }, this);
    // this.terria.afterWidgetChanged.addEventListener(function() {
    //    addUpdateSubscription();
    // }, this);
  };
  DistanceLegendViewModel.prototype.destroy = function () {
    this.eventHelper.removeAll();
  };
  DistanceLegendViewModel.prototype.show = function (container) {
    var testing;
    if (this.enableDistanceLegend) {
      testing = '<div class="distance-legend" data-bind="visible: distanceLabel && barWidth">' + '<div class="distance-legend-label" data-bind="text: distanceLabel"></div>' + '<div class="distance-legend-scale-bar" data-bind="style: { width: barWidth + \'px\', left: (5 + (125 - barWidth) / 2) + \'px\' }"></div>' + '</div>';
    } else {
      testing = '<div class="distance-legend"  style="display: none;" data-bind="visible: distanceLabel && barWidth">' + '<div class="distance-legend-label"  data-bind="text: distanceLabel"></div>' + '<div class="distance-legend-scale-bar"  data-bind="style: { width: barWidth + \'px\', left: (5 + (125 - barWidth) / 2) + \'px\' }"></div>' + '</div>';
    }
    loadView(testing, container, this);
  };
  DistanceLegendViewModel.create = function (options) {
    var result = new DistanceLegendViewModel(options);
    result.show(options.container);
    return result;
  };
  var geodesic = new EllipsoidGeodesic();
  var distances = [1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000, 200000, 300000, 500000, 1000000, 2000000, 3000000, 5000000, 10000000, 20000000, 30000000, 50000000];
  function updateDistanceLegendCesium(viewModel, scene) {
    if (!viewModel.enableDistanceLegend) {
      viewModel.barWidth = undefined;
      viewModel.distanceLabel = undefined;
      return;
    }
    var now = getTimestamp();
    if (now < viewModel._lastLegendUpdate + 250) {
      return;
    }
    viewModel._lastLegendUpdate = now;

    // Find the distance between two pixels at the bottom center of the screen.
    var width = scene.canvas.clientWidth;
    var height = scene.canvas.clientHeight;
    var left = scene.camera.getPickRay(new Cartesian2(width / 2 | 0, height - 1));
    var right = scene.camera.getPickRay(new Cartesian2(1 + width / 2 | 0, height - 1));
    var globe = scene.globe;
    var leftPosition = globe.pick(left, scene);
    var rightPosition = globe.pick(right, scene);
    if (!defined(leftPosition) || !defined(rightPosition)) {
      viewModel.barWidth = undefined;
      viewModel.distanceLabel = undefined;
      return;
    }
    var leftCartographic = globe.ellipsoid.cartesianToCartographic(leftPosition);
    var rightCartographic = globe.ellipsoid.cartesianToCartographic(rightPosition);
    geodesic.setEndPoints(leftCartographic, rightCartographic);
    var pixelDistance = geodesic.surfaceDistance;

    // Find the first distance that makes the scale bar less than 100 pixels.
    var maxBarWidth = 100;
    var distance;
    for (var i = distances.length - 1; !defined(distance) && i >= 0; --i) {
      if (distances[i] / pixelDistance < maxBarWidth) {
        distance = distances[i];
      }
    }
    if (defined(distance)) {
      var label;
      if (distance >= 1000) {
        label = (distance / 1000).toString() + ' km';
      } else {
        label = distance.toString() + ' m';
      }
      viewModel.barWidth = distance / pixelDistance | 0;
      viewModel.distanceLabel = label;
    } else {
      viewModel.barWidth = undefined;
      viewModel.distanceLabel = undefined;
    }
  }

  var defineBuiltInAccessor = function (target, name, descriptor) {
    if (descriptor.get) makeBuiltIn$1(descriptor.get, name, { getter: true });
    if (descriptor.set) makeBuiltIn$1(descriptor.set, name, { setter: true });
    return definePropertyModule.f(target, name, descriptor);
  };

  var defineBuiltInAccessor$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': defineBuiltInAccessor,
    __moduleExports: defineBuiltInAccessor
  });

  var defineBuiltInAccessor$2 = ( defineBuiltInAccessor$1 && defineBuiltInAccessor ) || defineBuiltInAccessor$1;

  var FUNCTION_NAME_EXISTS = require$$0.EXISTS;



  var FunctionPrototype$2 = Function.prototype;
  var functionToString$1 = uncurryThis(FunctionPrototype$2.toString);
  var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
  var regExpExec = uncurryThis(nameRE.exec);
  var NAME = 'name';

  // Function instances `.name` property
  // https://tc39.es/ecma262/#sec-function-instances-name
  if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
    defineBuiltInAccessor$2(FunctionPrototype$2, NAME, {
      configurable: true,
      get: function () {
        try {
          return regExpExec(nameRE, functionToString$1(this))[1];
        } catch (error) {
          return '';
        }
      }
    });
  }

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f$1
  };

  var objectPropertyIsEnumerable$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': objectPropertyIsEnumerable,
    __moduleExports: objectPropertyIsEnumerable,
    f: f$1
  });

  var $Object$3 = Object;
  var split = uncurryThis(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$2(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object$3('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof(it) === 'String' ? split(it, '') : $Object$3(it);
  } : $Object$3;

  var indexedObject$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': indexedObject,
    __moduleExports: indexedObject
  });

  var IndexedObject = ( indexedObject$1 && indexedObject ) || indexedObject$1;

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return IndexedObject(requireObjectCoercible$2(it));
  };

  var toIndexedObject$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': toIndexedObject,
    __moduleExports: toIndexedObject
  });

  var propertyIsEnumerableModule = ( objectPropertyIsEnumerable$1 && objectPropertyIsEnumerable ) || objectPropertyIsEnumerable$1;

  var toIndexedObject$2 = ( toIndexedObject$1 && toIndexedObject ) || toIndexedObject$1;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  var f$2 = DESCRIPTORS ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$2(O);
    P = toPropertyKey$2(P);
    if (IE8_DOM_DEFINE) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn(O, P)) return createPropertyDescriptor$2(!call$2(propertyIsEnumerableModule.f, O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$2
  };

  var objectGetOwnPropertyDescriptor$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': objectGetOwnPropertyDescriptor,
    __moduleExports: objectGetOwnPropertyDescriptor,
    f: f$2
  });

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `Math.trunc` method
  // https://tc39.es/ecma262/#sec-math.trunc
  // eslint-disable-next-line es/no-math-trunc -- safe
  var mathTrunc = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor : ceil)(n);
  };

  var mathTrunc$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': mathTrunc,
    __moduleExports: mathTrunc
  });

  var trunc = ( mathTrunc$1 && mathTrunc ) || mathTrunc$1;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc(number);
  };

  var toIntegerOrInfinity$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': toIntegerOrInfinity,
    __moduleExports: toIntegerOrInfinity
  });

  var toIntegerOrInfinity$2 = ( toIntegerOrInfinity$1 && toIntegerOrInfinity ) || toIntegerOrInfinity$1;

  var max = Math.max;
  var min = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toIntegerOrInfinity$2(index);
    return integer < 0 ? max(integer + length, 0) : min(integer, length);
  };

  var toAbsoluteIndex$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': toAbsoluteIndex,
    __moduleExports: toAbsoluteIndex
  });

  var min$1 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength = function (argument) {
    var len = toIntegerOrInfinity$2(argument);
    return len > 0 ? min$1(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': toLength,
    __moduleExports: toLength
  });

  var toLength$2 = ( toLength$1 && toLength ) || toLength$1;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike = function (obj) {
    return toLength$2(obj.length);
  };

  var lengthOfArrayLike$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': lengthOfArrayLike,
    __moduleExports: lengthOfArrayLike
  });

  var toAbsoluteIndex$2 = ( toAbsoluteIndex$1 && toAbsoluteIndex ) || toAbsoluteIndex$1;

  var lengthOfArrayLike$2 = ( lengthOfArrayLike$1 && lengthOfArrayLike ) || lengthOfArrayLike$1;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$2($this);
      var length = lengthOfArrayLike$2(O);
      if (length === 0) return !IS_INCLUDES && -1;
      var index = toAbsoluteIndex$2(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el !== el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value !== value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };
  var arrayIncludes_1 = arrayIncludes.includes;
  var arrayIncludes_2 = arrayIncludes.indexOf;

  var arrayIncludes$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': arrayIncludes,
    __moduleExports: arrayIncludes,
    includes: arrayIncludes_1,
    indexOf: arrayIncludes_2
  });

  var require$$0$1 = ( arrayIncludes$1 && arrayIncludes ) || arrayIncludes$1;

  var indexOf = require$$0$1.indexOf;


  var push = uncurryThis([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$2(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn(hiddenKeys$2, key) && hasOwn(O, key) && push(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn(O, key = names[i++])) {
      ~indexOf(result, key) || push(result, key);
    }
    return result;
  };

  var objectKeysInternal$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': objectKeysInternal,
    __moduleExports: objectKeysInternal
  });

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var enumBugKeys$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': enumBugKeys,
    __moduleExports: enumBugKeys
  });

  var internalObjectKeys = ( objectKeysInternal$1 && objectKeysInternal ) || objectKeysInternal$1;

  var enumBugKeys$2 = ( enumBugKeys$1 && enumBugKeys ) || enumBugKeys$1;

  var hiddenKeys$3 = enumBugKeys$2.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys$3);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  var objectGetOwnPropertyNames$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': objectGetOwnPropertyNames,
    __moduleExports: objectGetOwnPropertyNames,
    f: f$3
  });

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  var objectGetOwnPropertySymbols$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': objectGetOwnPropertySymbols,
    __moduleExports: objectGetOwnPropertySymbols,
    f: f$4
  });

  var getOwnPropertyNamesModule = ( objectGetOwnPropertyNames$1 && objectGetOwnPropertyNames ) || objectGetOwnPropertyNames$1;

  var getOwnPropertySymbolsModule = ( objectGetOwnPropertySymbols$1 && objectGetOwnPropertySymbols ) || objectGetOwnPropertySymbols$1;

  var concat = uncurryThis([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$2(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
  };

  var ownKeys$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': ownKeys,
    __moduleExports: ownKeys
  });

  var ownKeys$2 = ( ownKeys$1 && ownKeys ) || ownKeys$1;

  var require$$0$2 = ( objectGetOwnPropertyDescriptor$1 && objectGetOwnPropertyDescriptor ) || objectGetOwnPropertyDescriptor$1;

  var copyConstructorProperties = function (target, source, exceptions) {
    var keys = ownKeys$2(source);
    var defineProperty = definePropertyModule.f;
    var getOwnPropertyDescriptor = require$$0$2.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var copyConstructorProperties$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': copyConstructorProperties,
    __moduleExports: copyConstructorProperties
  });

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value === POLYFILL ? true
      : value === NATIVE ? false
      : isCallable$2(detection) ? fails$2(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var isForced$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': isForced_1,
    __moduleExports: isForced_1
  });

  var copyConstructorProperties$2 = ( copyConstructorProperties$1 && copyConstructorProperties ) || copyConstructorProperties$1;

  var isForced$2 = ( isForced$1 && isForced_1 ) || isForced$1;

  var getOwnPropertyDescriptor$1 = require$$0$2.f;






  /*
    options.target         - name of the target object
    options.global         - target is the global object
    options.stat           - export as static methods of target
    options.proto          - export as prototype methods of target
    options.real           - real prototype method for the `pure` version
    options.forced         - export even if the native feature is available
    options.bind           - bind methods to the target, required for the `pure` version
    options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe         - use the simple assignment of property instead of delete + defineProperty
    options.sham           - add a flag to not completely full polyfills
    options.enumerable     - export as enumerable property
    options.dontCallGetSet - prevent calling a getter on target
    options.name           - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = globalThis$2;
    } else if (STATIC) {
      target = globalThis$2[TARGET] || defineGlobalProperty$2(TARGET, {});
    } else {
      target = globalThis$2[TARGET] && globalThis$2[TARGET].prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced$2(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties$2(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$2(sourceProperty, 'sham', true);
      }
      defineBuiltIn$2(target, key, sourceProperty, options);
    }
  };

  var _export$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': _export,
    __moduleExports: _export
  });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$2);
  };

  var objectKeys$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': objectKeys,
    __moduleExports: objectKeys
  });

  var objectKeys$2 = ( objectKeys$1 && objectKeys ) || objectKeys$1;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var f$5 = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$2(O);
    var props = toIndexedObject$2(Properties);
    var keys = objectKeys$2(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
    return O;
  };

  var objectDefineProperties = {
  	f: f$5
  };

  var objectDefineProperties$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': objectDefineProperties,
    __moduleExports: objectDefineProperties,
    f: f$5
  });

  var html = getBuiltIn$2('document', 'documentElement');

  var html$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': html,
    __moduleExports: html
  });

  var require$$0$3 = ( objectDefineProperties$1 && objectDefineProperties ) || objectDefineProperties$1;

  var html$2 = ( html$1 && html ) || html$1;

  /* global ActiveXObject -- old IE, WSH */








  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey$2('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    // eslint-disable-next-line no-useless-assignment -- avoid memory leak
    activeXDocument = null;
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement$2('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html$2.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys$2.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys$2[length]];
    return NullProtoObject();
  };

  hiddenKeys$2[IE_PROTO] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  // eslint-disable-next-line es/no-object-create -- safe
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$2(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : require$$0$3.f(result, Properties);
  };

  var objectCreate$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': objectCreate,
    __moduleExports: objectCreate
  });

  var $ = ( _export$1 && _export ) || _export$1;

  var create = ( objectCreate$1 && objectCreate ) || objectCreate$1;

  // TODO: Remove from `core-js@4`




  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  $({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
    create: create
  });

  var svgReset = 'M 7.5,0 C 3.375,0 0,3.375 0,7.5 0,11.625 3.375,15 7.5,15 c 3.46875,0 6.375,-2.4375 7.21875,-5.625 l -1.96875,0 C 12,11.53125 9.9375,13.125 7.5,13.125 4.40625,13.125 1.875,10.59375 1.875,7.5 1.875,4.40625 4.40625,1.875 7.5,1.875 c 1.59375,0 2.90625,0.65625 3.9375,1.6875 l -3,3 6.5625,0 L 15,0 12.75,2.25 C 11.4375,0.84375 9.5625,0 7.5,0 z';

  var defineProperties = require$$0$3.f;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  $({ target: 'Object', stat: true, forced: Object.defineProperties !== defineProperties, sham: !DESCRIPTORS }, {
    defineProperties: defineProperties
  });

  var defined$1 = Cesium.defined;
  var DeveloperError$1 = Cesium.DeveloperError;
  var Knockout$2 = Cesium.knockout;
  /**
   * The view-model for a control in the user interface
   *
   * @alias UserInterfaceControl
   * @constructor
   * @abstract
   *
   * @param {Terria} terria The Terria instance.
   */
  var UserInterfaceControl = function UserInterfaceControl(terria) {
    if (!defined$1(terria)) {
      throw new DeveloperError$1('terria is required');
    }
    this._terria = terria;

    /**
     * Gets or sets the name of the control which is set as the controls title.
     * This property is observable.
     * @type {String}
     */
    this.name = 'Unnamed Control';

    /**
     * Gets or sets the text to be displayed in the UI control.
     * This property is observable.
     * @type {String}
     */
    this.text = undefined;

    /**
     * Gets or sets the svg icon of the control.  This property is observable.
     * @type {Object}
     */
    this.svgIcon = undefined;

    /**
     * Gets or sets the height of the svg icon.  This property is observable.
     * @type {Integer}
     */
    this.svgHeight = undefined;

    /**
     * Gets or sets the width of the svg icon.  This property is observable.
     * @type {Integer}
     */
    this.svgWidth = undefined;

    /**
     * Gets or sets the CSS class of the control. This property is observable.
     * @type {String}
     */
    this.cssClass = undefined;

    /**
     * Gets or sets the property describing whether or not the control is in the active state.
     * This property is observable.
     * @type {Boolean}
     */
    this.isActive = false;
    Knockout$2.track(this, ['name', 'svgIcon', 'svgHeight', 'svgWidth', 'cssClass', 'isActive']);
  };
  Object.defineProperties(UserInterfaceControl.prototype, {
    /**
     * Gets the Terria instance.
     * @memberOf UserInterfaceControl.prototype
     * @type {Terria}
     */
    terria: {
      get: function get() {
        return this._terria;
      }
    },
    /**
     * Gets a value indicating whether this button has text associated with it.
     * @type {Object}
     */
    hasText: {
      get: function get() {
        return defined$1(this.text) && typeof this.text === 'string';
      }
    }
  });

  /**
   * When implemented in a derived class, performs an action when the user clicks
   * on this control.
   * @abstract
   * @protected
   */
  UserInterfaceControl.prototype.activate = function () {
    throw new DeveloperError$1('activate must be implemented in the derived class.');
  };

  /**
   * The view-model for a control in the navigation control tool bar
   *
   * @alias NavigationControl
   * @constructor
   * @abstract
   *
   * @param {Terria} terria The Terria instance.
   */
  var NavigationControl = function NavigationControl(terria) {
    UserInterfaceControl.apply(this, arguments);
  };
  NavigationControl.prototype = Object.create(UserInterfaceControl.prototype);

  var defined$2 = Cesium.defined;
  var Camera = Cesium.Camera;
  var Rectangle = Cesium.Rectangle;
  var Cartographic = Cesium.Cartographic;
  /**
   * The model for a zoom in control in the navigation control tool bar
   *
   * @alias ResetViewNavigationControl
   * @constructor
   * @abstract
   *
   * @param {Terria} terria The Terria instance.
   */
  var ResetViewNavigationControl = function ResetViewNavigationControl(terria) {
    NavigationControl.apply(this, arguments);

    /**
     * Gets or sets the name of the control which is set as the control's title.
     * This property is observable.
     * @type {String}
     */
    this.name = '重置视图';
    this.navigationLocked = false;

    /**
     * Gets or sets the svg icon of the control.  This property is observable.
     * @type {Object}
     */
    this.svgIcon = svgReset;

    /**
     * Gets or sets the height of the svg icon.  This property is observable.
     * @type {Integer}
     */
    this.svgHeight = 15;

    /**
     * Gets or sets the width of the svg icon.  This property is observable.
     * @type {Integer}
     */
    this.svgWidth = 15;

    /**
     * Gets or sets the CSS class of the control. This property is observable.
     * @type {String}
     */
    this.cssClass = 'navigation-control-icon-reset';
  };
  ResetViewNavigationControl.prototype = Object.create(NavigationControl.prototype);
  ResetViewNavigationControl.prototype.setNavigationLocked = function (locked) {
    this.navigationLocked = locked;
  };
  ResetViewNavigationControl.prototype.resetView = function () {
    // this.terria.analytics.logEvent('navigation', 'click', 'reset');
    if (this.navigationLocked) {
      return;
    }
    var scene = this.terria.scene;
    var sscc = scene.screenSpaceCameraController;
    if (!sscc.enableInputs) {
      return;
    }
    this.isActive = true;
    var camera = scene.camera;
    if (defined$2(this.terria.trackedEntity)) {
      // when tracking do not reset to default view but to default view of tracked entity
      var trackedEntity = this.terria.trackedEntity;
      this.terria.trackedEntity = undefined;
      this.terria.trackedEntity = trackedEntity;
    } else {
      // reset to a default position or view defined in the options
      if (this.terria.options.defaultResetView) {
        if (this.terria.options.defaultResetView && this.terria.options.defaultResetView instanceof Cartographic) {
          camera.flyTo({
            destination: scene.globe.ellipsoid.cartographicToCartesian(this.terria.options.defaultResetView)
          });
        } else if (this.terria.options.defaultResetView && this.terria.options.defaultResetView instanceof Rectangle) {
          try {
            Rectangle.validate(this.terria.options.defaultResetView);
            camera.flyTo({
              destination: this.terria.options.defaultResetView,
              orientation: {
                heading: Cesium.Math.toRadians(5.729578)
              }
            });
          } catch (e) {
            console.log('Cesium-navigation/ResetViewNavigationControl:   options.defaultResetView Cesium rectangle is  invalid!');
          }
        }
      } else if (typeof camera.flyHome === 'function') {
        camera.flyHome(1);
      } else {
        camera.flyTo({
          'destination': Camera.DEFAULT_VIEW_RECTANGLE,
          'duration': 1
        });
      }
    }
    this.isActive = false;
  };

  /**
   * When implemented in a derived class, performs an action when the user clicks
   * on this control
   * @abstract
   * @protected
   */
  ResetViewNavigationControl.prototype.activate = function () {
    this.resetView();
  };

  /* eslint-disable no-unused-vars */
  var defined$3 = Cesium.defined;
  var Ray = Cesium.Ray;
  var Cartesian3 = Cesium.Cartesian3;
  var Cartographic$1 = Cesium.Cartographic;
  var ReferenceFrame = Cesium.ReferenceFrame;
  var SceneMode = Cesium.SceneMode;
  var Utils = {};
  var unprojectedScratch = new Cartographic$1();
  var rayScratch = new Ray();

  /**
   * gets the focus point of the camera
   * @param {Viewer|Widget} terria The terria
   * @param {boolean} inWorldCoordinates true to get the focus in world coordinates, otherwise get it in projection-specific map coordinates, in meters.
   * @param {Cartesian3} [result] The object in which the result will be stored.
   * @return {Cartesian3} The modified result parameter, a new instance if none was provided or undefined if there is no focus point.
   */
  Utils.getCameraFocus = function (terria, inWorldCoordinates, result) {
    var scene = terria.scene;
    var camera = scene.camera;
    if (scene.mode === SceneMode.MORPHING) {
      return undefined;
    }
    if (!defined$3(result)) {
      result = new Cartesian3();
    }

    // TODO bug when tracking: if entity moves the current position should be used and not only the one when starting orbiting/rotating
    // TODO bug when tracking: reset should reset to default view of tracked entity

    if (defined$3(terria.trackedEntity)) {
      result = terria.trackedEntity.position.getValue(terria.clock.currentTime, result);
    } else {
      rayScratch.origin = camera.positionWC;
      rayScratch.direction = camera.directionWC;
      result = scene.globe.pick(rayScratch, scene, result);
    }
    if (!defined$3(result)) {
      return undefined;
    }
    if (scene.mode === SceneMode.SCENE2D || scene.mode === SceneMode.COLUMBUS_VIEW) {
      result = camera.worldToCameraCoordinatesPoint(result, result);
      if (inWorldCoordinates) {
        result = scene.globe.ellipsoid.cartographicToCartesian(scene.mapProjection.unproject(result, unprojectedScratch), result);
      }
    } else {
      if (!inWorldCoordinates) {
        result = camera.worldToCameraCoordinatesPoint(result, result);
      }
    }
    return result;
  };

  var defined$4 = Cesium.defined;
  var Ray$1 = Cesium.Ray;
  var IntersectionTests = Cesium.IntersectionTests;
  var Cartesian3$1 = Cesium.Cartesian3;
  var SceneMode$1 = Cesium.SceneMode;

  /**
   * The model for a zoom in control in the navigation control tool bar
   *
   * @alias ZoomOutNavigationControl
   * @constructor
   * @abstract
   *
   * @param {Terria} terria The Terria instance.
   * @param {boolean} zoomIn is used for zooming in (true) or out (false)
   */
  var ZoomNavigationControl = function ZoomNavigationControl(terria, zoomIn) {
    NavigationControl.apply(this, arguments);

    /**
     * Gets or sets the name of the control which is set as the control's title.
     * This property is observable.
     * @type {String}
     */
    this.name = 'Zoom ' + (zoomIn ? 'In' : 'Out');

    /**
     * Gets or sets the text to be displayed in the nav control. Controls that
     * have text do not display the svgIcon.
     * This property is observable.
     * @type {String}
     */
    this.text = zoomIn ? '+' : '-';

    /**
     * Gets or sets the CSS class of the control. This property is observable.
     * @type {String}
     */
    this.cssClass = 'navigation-control-icon-zoom-' + (zoomIn ? 'in' : 'out');
    this.relativeAmount = 2;
    if (zoomIn) {
      // this ensures that zooming in is the inverse of zooming out and vice versa
      // e.g. the camera position remains when zooming in and out
      this.relativeAmount = 1 / this.relativeAmount;
    }
  };
  ZoomNavigationControl.prototype.relativeAmount = 1;
  ZoomNavigationControl.prototype = Object.create(NavigationControl.prototype);

  /**
   * When implemented in a derived class, performs an action when the user clicks
   * on this control
   * @abstract
   * @protected
   */
  ZoomNavigationControl.prototype.activate = function () {
    this.zoom(this.relativeAmount);
  };
  var cartesian3Scratch = new Cartesian3$1();
  ZoomNavigationControl.prototype.zoom = function (relativeAmount) {
    // this.terria.analytics.logEvent('navigation', 'click', 'zoomIn');

    this.isActive = true;
    if (defined$4(this.terria)) {
      var scene = this.terria.scene;
      var sscc = scene.screenSpaceCameraController;
      // do not zoom if it is disabled
      if (!sscc.enableInputs || !sscc.enableZoom) {
        return;
      }
      // TODO
      //            if(scene.mode == SceneMode.COLUMBUS_VIEW && !sscc.enableTranslate) {
      //                return;
      //            }

      var camera = scene.camera;
      var orientation;
      switch (scene.mode) {
        case SceneMode$1.MORPHING:
          break;
        case SceneMode$1.SCENE2D:
          camera.zoomIn(camera.positionCartographic.height * (1 - this.relativeAmount));
          break;
        default:
          var focus;
          if (defined$4(this.terria.trackedEntity)) {
            focus = new Cartesian3$1();
          } else {
            focus = Utils.getCameraFocus(this.terria, false);
          }
          if (!defined$4(focus)) {
            // Camera direction is not pointing at the globe, so use the ellipsoid horizon point as
            // the focal point.
            var ray = new Ray$1(camera.worldToCameraCoordinatesPoint(scene.globe.ellipsoid.cartographicToCartesian(camera.positionCartographic)), camera.directionWC);
            focus = IntersectionTests.grazingAltitudeLocation(ray, scene.globe.ellipsoid);
            orientation = {
              heading: camera.heading,
              pitch: camera.pitch,
              roll: camera.roll
            };
          } else {
            orientation = {
              direction: camera.direction,
              up: camera.up
            };
          }
          var direction = Cartesian3$1.subtract(camera.position, focus, cartesian3Scratch);
          var movementVector = Cartesian3$1.multiplyByScalar(direction, relativeAmount, direction);
          var endPosition = Cartesian3$1.add(focus, movementVector, focus);
          if (defined$4(this.terria.trackedEntity) || scene.mode === SceneMode$1.COLUMBUS_VIEW) {
            // sometimes flyTo does not work (jumps to wrong position) so just set the position without any animation
            // do not use flyTo when tracking an entity because during animatiuon the position of the entity may change
            camera.position = endPosition;
          } else {
            camera.flyTo({
              destination: endPosition,
              orientation: orientation,
              duration: 0.5,
              convert: false
            });
          }
      }
    }

    // this.terria.notifyRepaintRequired();
    this.isActive = false;
  };

  var svgCompassOuterRing = 'm 66.5625,0 0,15.15625 3.71875,0 0,-10.40625 5.5,10.40625 4.375,0 0,-15.15625 -3.71875,0 0,10.40625 L 70.9375,0 66.5625,0 z M 72.5,20.21875 c -28.867432,0 -52.28125,23.407738 -52.28125,52.28125 0,28.87351 23.413818,52.3125 52.28125,52.3125 28.86743,0 52.28125,-23.43899 52.28125,-52.3125 0,-28.873512 -23.41382,-52.28125 -52.28125,-52.28125 z m 0,1.75 c 13.842515,0 26.368948,5.558092 35.5,14.5625 l -11.03125,11 0.625,0.625 11.03125,-11 c 8.9199,9.108762 14.4375,21.579143 14.4375,35.34375 0,13.764606 -5.5176,26.22729 -14.4375,35.34375 l -11.03125,-11 -0.625,0.625 11.03125,11 c -9.130866,9.01087 -21.658601,14.59375 -35.5,14.59375 -13.801622,0 -26.321058,-5.53481 -35.4375,-14.5 l 11.125,-11.09375 c 6.277989,6.12179 14.857796,9.90625 24.3125,9.90625 19.241896,0 34.875,-15.629154 34.875,-34.875 0,-19.245847 -15.633104,-34.84375 -34.875,-34.84375 -9.454704,0 -18.034511,3.760884 -24.3125,9.875 L 37.0625,36.4375 C 46.179178,27.478444 58.696991,21.96875 72.5,21.96875 z m -0.875,0.84375 0,13.9375 1.75,0 0,-13.9375 -1.75,0 z M 36.46875,37.0625 47.5625,48.15625 C 41.429794,54.436565 37.65625,63.027539 37.65625,72.5 c 0,9.472461 3.773544,18.055746 9.90625,24.34375 L 36.46875,107.9375 c -8.96721,-9.1247 -14.5,-21.624886 -14.5,-35.4375 0,-13.812615 5.53279,-26.320526 14.5,-35.4375 z M 72.5,39.40625 c 18.297686,0 33.125,14.791695 33.125,33.09375 0,18.302054 -14.827314,33.125 -33.125,33.125 -18.297687,0 -33.09375,-14.822946 -33.09375,-33.125 0,-18.302056 14.796063,-33.09375 33.09375,-33.09375 z M 22.84375,71.625 l 0,1.75 13.96875,0 0,-1.75 -13.96875,0 z m 85.5625,0 0,1.75 14,0 0,-1.75 -14,0 z M 71.75,108.25 l 0,13.9375 1.71875,0 0,-13.9375 -1.71875,0 z';

  var svgCompassGyro = 'm 72.71875,54.375 c -0.476702,0 -0.908208,0.245402 -1.21875,0.5625 -0.310542,0.317098 -0.551189,0.701933 -0.78125,1.1875 -0.172018,0.363062 -0.319101,0.791709 -0.46875,1.25 -6.91615,1.075544 -12.313231,6.656514 -13,13.625 -0.327516,0.117495 -0.661877,0.244642 -0.9375,0.375 -0.485434,0.22959 -0.901634,0.471239 -1.21875,0.78125 -0.317116,0.310011 -0.5625,0.742111 -0.5625,1.21875 l 0.03125,0 c 0,0.476639 0.245384,0.877489 0.5625,1.1875 0.317116,0.310011 0.702066,0.58291 1.1875,0.8125 0.35554,0.168155 0.771616,0.32165 1.21875,0.46875 1.370803,6.10004 6.420817,10.834127 12.71875,11.8125 0.146999,0.447079 0.30025,0.863113 0.46875,1.21875 0.230061,0.485567 0.470708,0.870402 0.78125,1.1875 0.310542,0.317098 0.742048,0.5625 1.21875,0.5625 0.476702,0 0.876958,-0.245402 1.1875,-0.5625 0.310542,-0.317098 0.582439,-0.701933 0.8125,-1.1875 0.172018,-0.363062 0.319101,-0.791709 0.46875,-1.25 6.249045,-1.017063 11.256351,-5.7184 12.625,-11.78125 0.447134,-0.1471 0.86321,-0.300595 1.21875,-0.46875 0.485434,-0.22959 0.901633,-0.502489 1.21875,-0.8125 0.317117,-0.310011 0.5625,-0.710861 0.5625,-1.1875 l -0.03125,0 c 0,-0.476639 -0.245383,-0.908739 -0.5625,-1.21875 C 89.901633,71.846239 89.516684,71.60459 89.03125,71.375 88.755626,71.244642 88.456123,71.117495 88.125,71 87.439949,64.078341 82.072807,58.503735 75.21875,57.375 c -0.15044,-0.461669 -0.326927,-0.884711 -0.5,-1.25 -0.230061,-0.485567 -0.501958,-0.870402 -0.8125,-1.1875 -0.310542,-0.317098 -0.710798,-0.5625 -1.1875,-0.5625 z m -0.0625,1.40625 c 0.03595,-0.01283 0.05968,0 0.0625,0 0.0056,0 0.04321,-0.02233 0.1875,0.125 0.144288,0.147334 0.34336,0.447188 0.53125,0.84375 0.06385,0.134761 0.123901,0.309578 0.1875,0.46875 -0.320353,-0.01957 -0.643524,-0.0625 -0.96875,-0.0625 -0.289073,0 -0.558569,0.04702 -0.84375,0.0625 C 71.8761,57.059578 71.936151,56.884761 72,56.75 c 0.18789,-0.396562 0.355712,-0.696416 0.5,-0.84375 0.07214,-0.07367 0.120304,-0.112167 0.15625,-0.125 z m 0,2.40625 c 0.448007,0 0.906196,0.05436 1.34375,0.09375 0.177011,0.592256 0.347655,1.271044 0.5,2.03125 0.475097,2.370753 0.807525,5.463852 0.9375,8.9375 -0.906869,-0.02852 -1.834463,-0.0625 -2.78125,-0.0625 -0.92298,0 -1.802327,0.03537 -2.6875,0.0625 0.138529,-3.473648 0.493653,-6.566747 0.96875,-8.9375 0.154684,-0.771878 0.320019,-1.463985 0.5,-2.0625 0.405568,-0.03377 0.804291,-0.0625 1.21875,-0.0625 z m -2.71875,0.28125 c -0.129732,0.498888 -0.259782,0.987558 -0.375,1.5625 -0.498513,2.487595 -0.838088,5.693299 -0.96875,9.25 -3.21363,0.15162 -6.119596,0.480068 -8.40625,0.9375 -0.682394,0.136509 -1.275579,0.279657 -1.84375,0.4375 0.799068,-6.135482 5.504716,-11.036454 11.59375,-12.1875 z M 75.5,58.5 c 6.043169,1.18408 10.705093,6.052712 11.5,12.15625 -0.569435,-0.155806 -1.200273,-0.302525 -1.875,-0.4375 -2.262525,-0.452605 -5.108535,-0.783809 -8.28125,-0.9375 -0.130662,-3.556701 -0.470237,-6.762405 -0.96875,-9.25 C 75.761959,59.467174 75.626981,58.990925 75.5,58.5 z m -2.84375,12.09375 c 0.959338,0 1.895843,0.03282 2.8125,0.0625 C 75.48165,71.267751 75.5,71.871028 75.5,72.5 c 0,1.228616 -0.01449,2.438313 -0.0625,3.59375 -0.897358,0.0284 -1.811972,0.0625 -2.75,0.0625 -0.927373,0 -1.831062,-0.03473 -2.71875,-0.0625 -0.05109,-1.155437 -0.0625,-2.365134 -0.0625,-3.59375 0,-0.628972 0.01741,-1.232249 0.03125,-1.84375 0.895269,-0.02827 1.783025,-0.0625 2.71875,-0.0625 z M 68.5625,70.6875 c -0.01243,0.60601 -0.03125,1.189946 -0.03125,1.8125 0,1.22431 0.01541,2.407837 0.0625,3.5625 -3.125243,-0.150329 -5.92077,-0.471558 -8.09375,-0.90625 -0.784983,-0.157031 -1.511491,-0.316471 -2.125,-0.5 -0.107878,-0.704096 -0.1875,-1.422089 -0.1875,-2.15625 0,-0.115714 0.02849,-0.228688 0.03125,-0.34375 0.643106,-0.20284 1.389577,-0.390377 2.25,-0.5625 2.166953,-0.433487 4.97905,-0.75541 8.09375,-0.90625 z m 8.3125,0.03125 c 3.075121,0.15271 5.824455,0.446046 7.96875,0.875 0.857478,0.171534 1.630962,0.360416 2.28125,0.5625 0.0027,0.114659 0,0.228443 0,0.34375 0,0.735827 -0.07914,1.450633 -0.1875,2.15625 -0.598568,0.180148 -1.29077,0.34562 -2.0625,0.5 -2.158064,0.431708 -4.932088,0.754666 -8.03125,0.90625 0.04709,-1.154663 0.0625,-2.33819 0.0625,-3.5625 0,-0.611824 -0.01924,-1.185379 -0.03125,-1.78125 z M 57.15625,72.5625 c 0.0023,0.572772 0.06082,1.131112 0.125,1.6875 -0.125327,-0.05123 -0.266577,-0.10497 -0.375,-0.15625 -0.396499,-0.187528 -0.665288,-0.387337 -0.8125,-0.53125 -0.147212,-0.143913 -0.15625,-0.182756 -0.15625,-0.1875 0,-0.0047 -0.02221,-0.07484 0.125,-0.21875 0.147212,-0.143913 0.447251,-0.312472 0.84375,-0.5 0.07123,-0.03369 0.171867,-0.06006 0.25,-0.09375 z m 31.03125,0 c 0.08201,0.03503 0.175941,0.05872 0.25,0.09375 0.396499,0.187528 0.665288,0.356087 0.8125,0.5 0.14725,0.14391 0.15625,0.21405 0.15625,0.21875 0,0.0047 -0.009,0.04359 -0.15625,0.1875 -0.147212,0.143913 -0.416001,0.343722 -0.8125,0.53125 -0.09755,0.04613 -0.233314,0.07889 -0.34375,0.125 0.06214,-0.546289 0.09144,-1.094215 0.09375,-1.65625 z m -29.5,3.625 c 0.479308,0.123125 0.983064,0.234089 1.53125,0.34375 2.301781,0.460458 5.229421,0.787224 8.46875,0.9375 0.167006,2.84339 0.46081,5.433176 0.875,7.5 0.115218,0.574942 0.245268,1.063612 0.375,1.5625 -5.463677,-1.028179 -9.833074,-5.091831 -11.25,-10.34375 z m 27.96875,0 C 85.247546,81.408945 80.919274,85.442932 75.5,86.5 c 0.126981,-0.490925 0.261959,-0.967174 0.375,-1.53125 0.41419,-2.066824 0.707994,-4.65661 0.875,-7.5 3.204493,-0.15162 6.088346,-0.480068 8.375,-0.9375 0.548186,-0.109661 1.051942,-0.220625 1.53125,-0.34375 z M 70.0625,77.53125 c 0.865391,0.02589 1.723666,0.03125 2.625,0.03125 0.912062,0 1.782843,-0.0048 2.65625,-0.03125 -0.165173,2.736408 -0.453252,5.207651 -0.84375,7.15625 -0.152345,0.760206 -0.322989,1.438994 -0.5,2.03125 -0.437447,0.03919 -0.895856,0.0625 -1.34375,0.0625 -0.414943,0 -0.812719,-0.02881 -1.21875,-0.0625 -0.177011,-0.592256 -0.347655,-1.271044 -0.5,-2.03125 -0.390498,-1.948599 -0.700644,-4.419842 -0.875,-7.15625 z m 1.75,10.28125 c 0.284911,0.01545 0.554954,0.03125 0.84375,0.03125 0.325029,0 0.648588,-0.01171 0.96875,-0.03125 -0.05999,0.148763 -0.127309,0.31046 -0.1875,0.4375 -0.18789,0.396562 -0.386962,0.696416 -0.53125,0.84375 -0.144288,0.147334 -0.181857,0.125 -0.1875,0.125 -0.0056,0 -0.07446,0.02233 -0.21875,-0.125 C 72.355712,88.946416 72.18789,88.646562 72,88.25 71.939809,88.12296 71.872486,87.961263 71.8125,87.8125 z';

  var svgCompassRotationMarker = 'M 72.46875,22.03125 C 59.505873,22.050338 46.521615,27.004287 36.6875,36.875 L 47.84375,47.96875 C 61.521556,34.240041 83.442603,34.227389 97.125,47.90625 l 11.125,-11.125 C 98.401629,26.935424 85.431627,22.012162 72.46875,22.03125 z';

  var defined$5 = Cesium.defined;
  var CesiumMath = Cesium.Math;
  var getTimestamp$1 = Cesium.getTimestamp;
  var EventHelper$1 = Cesium.EventHelper;
  var Transforms = Cesium.Transforms;
  var SceneMode$2 = Cesium.SceneMode;
  var Cartesian2$1 = Cesium.Cartesian2;
  var Cartesian3$2 = Cesium.Cartesian3;
  var Matrix4 = Cesium.Matrix4;
  var BoundingSphere = Cesium.BoundingSphere;
  var HeadingPitchRange = Cesium.HeadingPitchRange;
  var Knockout$3 = Cesium.knockout;
  var _NavigationViewModel = function NavigationViewModel(options) {
    this.terria = options.terria;
    this.eventHelper = new EventHelper$1();
    this.enableZoomControls = defined$5(options.enableZoomControls) ? options.enableZoomControls : true;
    this.enableCompass = defined$5(options.enableCompass) ? options.enableCompass : true;
    this.navigationLocked = false;
    this.compassPosition = defined$5(this.terria.options.compassPosition) ? this.terria.options.compassPosition : {
      bottom: "12rem",
      right: "0rem"
    };
    this.zoomPosition = defined$5(this.terria.options.zoomPosition) ? this.terria.options.zoomPosition : {
      bottom: "4rem",
      right: "1.5rem"
    };
    this.controls = options.controls;
    if (!defined$5(this.controls)) {
      this.controls = [new ZoomNavigationControl(this.terria, true), new ResetViewNavigationControl(this.terria), new ZoomNavigationControl(this.terria, false)];
    }
    this.svgCompassOuterRing = svgCompassOuterRing;
    this.svgCompassGyro = svgCompassGyro;
    this.svgCompassRotationMarker = svgCompassRotationMarker;
    this.showCompass = defined$5(this.terria) && this.enableCompass;
    this.heading = this.showCompass ? this.terria.scene.camera.heading : 0.0;
    this.isOrbiting = false;
    this.orbitCursorAngle = 0;
    this.orbitCursorOpacity = 0.0;
    this.orbitLastTimestamp = 0;
    this.orbitFrame = undefined;
    this.orbitIsLook = false;
    this.orbitMouseMoveFunction = undefined;
    this.orbitMouseUpFunction = undefined;
    this.isRotating = false;
    this.rotateInitialCursorAngle = undefined;
    this.rotateFrame = undefined;
    this.rotateIsLook = false;
    this.rotateMouseMoveFunction = undefined;
    this.rotateMouseUpFunction = undefined;
    this._unsubcribeFromPostRender = undefined;
    Knockout$3.track(this, ['controls', 'showCompass', 'heading', 'isOrbiting', 'orbitCursorAngle', 'isRotating']);
    var that = this;
    _NavigationViewModel.prototype.setNavigationLocked = function (locked) {
      this.navigationLocked = locked;
      if (this.controls && this.controls.length > 1) {
        this.controls[1].setNavigationLocked(this.navigationLocked);
      }
    };
    function widgetChange() {
      if (defined$5(that.terria)) {
        if (that._unsubcribeFromPostRender) {
          that._unsubcribeFromPostRender();
          that._unsubcribeFromPostRender = undefined;
        }
        that.showCompass =  that.enableCompass;
        that._unsubcribeFromPostRender = that.terria.scene.postRender.addEventListener(function () {
          that.heading = that.terria.scene.camera.heading;
        });
      } else {
        if (that._unsubcribeFromPostRender) {
          that._unsubcribeFromPostRender();
          that._unsubcribeFromPostRender = undefined;
        }
        that.showCompass = false;
      }
    }
    this.eventHelper.add(this.terria.afterWidgetChanged, widgetChange, this);
    widgetChange();
  };
  _NavigationViewModel.prototype.destroy = function () {
    this.eventHelper.removeAll();
  };
  _NavigationViewModel.prototype.show = function (container) {
    var testing;
    if (this.enableZoomControls && this.enableCompass) {
      testing = '<div class="compass" title="" data-bind="visible: showCompass, event: { mousedown: handleMouseDown, dblclick: handleDoubleClick },style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.compassPosition.left + '\', bottom: \'' + this.compassPosition.bottom + '\', right: \'' + this.compassPosition.right + '\' }">' + '<div class="compass-outer-ring-background"></div>' + ' <div class="compass-rotation-marker" data-bind="visible: isOrbiting, style: { transform: \'rotate(-\' + orbitCursorAngle + \'rad)\', \'-webkit-transform\': \'rotate(-\' + orbitCursorAngle + \'rad)\', opacity: orbitCursorOpacity }, cesiumSvgPath: { path: svgCompassRotationMarker, width: 145, height: 145 }"></div>' + ' <div class="compass-outer-ring" title="" data-bind="style: { transform: \'rotate(-\' + heading + \'rad)\', \'-webkit-transform\': \'rotate(-\' + heading + \'rad)\' }, cesiumSvgPath: { path: svgCompassOuterRing, width: 145, height: 145 }"></div>' + ' <div class="compass-gyro-background"></div>' + ' <div class="compass-gyro" data-bind="cesiumSvgPath: { path: svgCompassGyro, width: 145, height: 145 }, css: { \'compass-gyro-active\': isOrbiting }"></div>' + '</div>' + '<div class="navigation-controls" data-bind="style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.zoomPosition.left + '\', bottom: \'' + this.zoomPosition.bottom + '\', right: \'' + this.zoomPosition.right + '\' }">' + '<!-- ko foreach: controls -->' + '<div data-bind="click: activate, attr: { title: $data.name }, css: $root.isLastControl($data) ? \'navigation-control-last\' : \'navigation-control\' ">' + '   <!-- ko if: $data.hasText -->' + '   <div data-bind="text: $data.text, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' + '   <!-- /ko -->' + '  <!-- ko ifnot: $data.hasText -->' + '  <div data-bind="cesiumSvgPath: { path: $data.svgIcon, width: $data.svgWidth, height: $data.svgHeight }, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' + '  <!-- /ko -->' + ' </div>' + ' <!-- /ko -->' + '</div>';
    } else if (!this.enableZoomControls && this.enableCompass) {
      testing = '<div class="compass" title="" data-bind="visible: showCompass, event: { mousedown: handleMouseDown, dblclick: handleDoubleClick ,style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.compassPosition.left + '\', bottom: \'' + this.compassPosition.bottom + '\', right: \'' + this.compassPosition.right + '\'}">' + '<div class="compass-outer-ring-background"></div>' + ' <div class="compass-rotation-marker" data-bind="visible: isOrbiting, style: { transform: \'rotate(-\' + orbitCursorAngle + \'rad)\', \'-webkit-transform\': \'rotate(-\' + orbitCursorAngle + \'rad)\', opacity: orbitCursorOpacity }, cesiumSvgPath: { path: svgCompassRotationMarker, width: 145, height: 145 }"></div>' + ' <div class="compass-outer-ring" title="" data-bind="style: { transform: \'rotate(-\' + heading + \'rad)\', \'-webkit-transform\': \'rotate(-\' + heading + \'rad)\' }, cesiumSvgPath: { path: svgCompassOuterRing, width: 145, height: 145 }"></div>' + ' <div class="compass-gyro-background"></div>' + ' <div class="compass-gyro" data-bind="cesiumSvgPath: { path: svgCompassGyro, width: 145, height: 145 }, css: { \'compass-gyro-active\': isOrbiting }"></div>' + '</div>' + '<div class="navigation-controls"  style="display: none;" data-bind="style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.zoomPosition.left + '\', bottom: \'' + this.zoomPosition.bottom + '\', right: \'' + this.zoomPosition.right + '\' }">' + '<!-- ko foreach: controls -->' + '<div data-bind="click: activate, attr: { title: $data.name }, css: $root.isLastControl($data) ? \'navigation-control-last\' : \'navigation-control\' ">' + '   <!-- ko if: $data.hasText -->' + '   <div data-bind="text: $data.text, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' + '   <!-- /ko -->' + '  <!-- ko ifnot: $data.hasText -->' + '  <div data-bind="cesiumSvgPath: { path: $data.svgIcon, width: $data.svgWidth, height: $data.svgHeight }, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' + '  <!-- /ko -->' + ' </div>' + ' <!-- /ko -->' + '</div>';
    } else if (this.enableZoomControls && !this.enableCompass) {
      testing = '<div class="compass"  style="display: none;" title="" data-bind="visible: showCompass, event: { mousedown: handleMouseDown, dblclick: handleDoubleClick,style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.compassPosition.left + '\', bottom: \'' + this.compassPosition.bottom + '\', right: \'' + this.compassPosition.right + '\'}">' + '<div class="compass-outer-ring-background"></div>' + ' <div class="compass-rotation-marker" data-bind="visible: isOrbiting, style: { transform: \'rotate(-\' + orbitCursorAngle + \'rad)\', \'-webkit-transform\': \'rotate(-\' + orbitCursorAngle + \'rad)\', opacity: orbitCursorOpacity }, cesiumSvgPath: { path: svgCompassRotationMarker, width: 145, height: 145 }"></div>' + ' <div class="compass-outer-ring" title="" data-bind="style: { transform: \'rotate(-\' + heading + \'rad)\', \'-webkit-transform\': \'rotate(-\' + heading + \'rad)\' }, cesiumSvgPath: { path: svgCompassOuterRing, width: 145, height: 145 }"></div>' + ' <div class="compass-gyro-background"></div>' + ' <div class="compass-gyro" data-bind="cesiumSvgPath: { path: svgCompassGyro, width: 145, height: 145 }, css: { \'compass-gyro-active\': isOrbiting }"></div>' + '</div>' + '<div class="navigation-controls"  data-bind="style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.zoomPosition.left + '\', bottom: \'' + this.zoomPosition.bottom + '\', right: \'' + this.zoomPosition.right + '\' }" >' + '<!-- ko foreach: controls -->' + '<div data-bind="click: activate, attr: { title: $data.name }, css: $root.isLastControl($data) ? \'navigation-control-last\' : \'navigation-control\' ">' + '   <!-- ko if: $data.hasText -->' + '   <div data-bind="text: $data.text, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' + '   <!-- /ko -->' + '  <!-- ko ifnot: $data.hasText -->' + '  <div data-bind="cesiumSvgPath: { path: $data.svgIcon, width: $data.svgWidth, height: $data.svgHeight }, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' + '  <!-- /ko -->' + ' </div>' + ' <!-- /ko -->' + '</div>';
    } else if (!this.enableZoomControls && !this.enableCompass) {
      testing = '<div class="compass"  style="display: none;" title="" data-bind="visible: showCompass, event: { mousedown: handleMouseDown, dblclick: handleDoubleClick,style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.compassPosition.left + '\', bottom: \'' + this.compassPosition.bottom + '\', right: \'' + this.compassPosition.right + '\'}">' + '<div class="compass-outer-ring-background"></div>' + ' <div class="compass-rotation-marker" data-bind="visible: isOrbiting, style: { transform: \'rotate(-\' + orbitCursorAngle + \'rad)\', \'-webkit-transform\': \'rotate(-\' + orbitCursorAngle + \'rad)\', opacity: orbitCursorOpacity }, cesiumSvgPath: { path: svgCompassRotationMarker, width: 145, height: 145 }"></div>' + ' <div class="compass-outer-ring" title="" data-bind="style: { transform: \'rotate(-\' + heading + \'rad)\', \'-webkit-transform\': \'rotate(-\' + heading + \'rad)\' }, cesiumSvgPath: { path: svgCompassOuterRing, width: 145, height: 145 }"></div>' + ' <div class="compass-gyro-background"></div>' + ' <div class="compass-gyro" data-bind="cesiumSvgPath: { path: svgCompassGyro, width: 145, height: 145 }, css: { \'compass-gyro-active\': isOrbiting }"></div>' + '</div>' + '<div class="navigation-controls"   style="display: none;" data-bind="style: { top: \'' + this.compassPosition.top + '\', left: \'' + this.zoomPosition.left + '\', bottom: \'' + this.zoomPosition.bottom + '\', right: \'' + this.zoomPosition.right + '\' }">' + '<!-- ko foreach: controls -->' + '<div data-bind="click: activate, attr: { title: $data.name }, css: $root.isLastControl($data) ? \'navigation-control-last\' : \'navigation-control\' ">' + '   <!-- ko if: $data.hasText -->' + '   <div data-bind="text: $data.text, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' + '   <!-- /ko -->' + '  <!-- ko ifnot: $data.hasText -->' + '  <div data-bind="cesiumSvgPath: { path: $data.svgIcon, width: $data.svgWidth, height: $data.svgHeight }, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>' + '  <!-- /ko -->' + ' </div>' + ' <!-- /ko -->' + '</div>';
    }
    loadView(testing, container, this);
  };

  /**
   * Adds a control to this toolbar.
   * @param {NavControl} control The control to add.
   */
  _NavigationViewModel.prototype.add = function (control) {
    this.controls.push(control);
  };

  /**
   * Removes a control from this toolbar.
   * @param {NavControl} control The control to remove.
   */
  _NavigationViewModel.prototype.remove = function (control) {
    this.controls.remove(control);
  };

  /**
   * Checks if the control given is the last control in the control array.
   * @param {NavControl} control The control to remove.
   */
  _NavigationViewModel.prototype.isLastControl = function (control) {
    return control === this.controls[this.controls.length - 1];
  };
  var vectorScratch = new Cartesian2$1();
  _NavigationViewModel.prototype.handleMouseDown = function (viewModel, e) {
    var scene = this.terria.scene;
    if (scene.mode === SceneMode$2.MORPHING) {
      return true;
    }
    if (viewModel.navigationLocked) {
      return true;
    }
    var compassElement = e.currentTarget;
    var compassRectangle = e.currentTarget.getBoundingClientRect();
    var maxDistance = compassRectangle.width / 2.0;
    var center = new Cartesian2$1((compassRectangle.right - compassRectangle.left) / 2.0, (compassRectangle.bottom - compassRectangle.top) / 2.0);
    var clickLocation = new Cartesian2$1(e.clientX - compassRectangle.left, e.clientY - compassRectangle.top);
    var vector = Cartesian2$1.subtract(clickLocation, center, vectorScratch);
    var distanceFromCenter = Cartesian2$1.magnitude(vector);
    var distanceFraction = distanceFromCenter / maxDistance;
    var nominalTotalRadius = 145;
    var norminalGyroRadius = 50;
    if (distanceFraction < norminalGyroRadius / nominalTotalRadius) {
      orbit(this, compassElement, vector);
    } else if (distanceFraction < 1.0) {
      rotate(this, compassElement, vector);
    } else {
      return true;
    }
  };
  var oldTransformScratch = new Matrix4();
  var newTransformScratch = new Matrix4();
  var centerScratch = new Cartesian3$2();
  _NavigationViewModel.prototype.handleDoubleClick = function (viewModel, e) {
    var scene = viewModel.terria.scene;
    var camera = scene.camera;
    var sscc = scene.screenSpaceCameraController;
    if (scene.mode === SceneMode$2.MORPHING || !sscc.enableInputs) {
      return true;
    }
    if (viewModel.navigationLocked) {
      return true;
    }
    if (scene.mode === SceneMode$2.COLUMBUS_VIEW && !sscc.enableTranslate) {
      return;
    }
    if (scene.mode === SceneMode$2.SCENE3D || scene.mode === SceneMode$2.COLUMBUS_VIEW) {
      if (!sscc.enableLook) {
        return;
      }
      if (scene.mode === SceneMode$2.SCENE3D) {
        if (!sscc.enableRotate) {
          return;
        }
      }
    }
    var center = Utils.getCameraFocus(viewModel.terria, true, centerScratch);
    if (!defined$5(center)) {
      // Globe is barely visible, so reset to home view.
      this.controls[1].resetView();
      return;
    }
    var cameraPosition = scene.globe.ellipsoid.cartographicToCartesian(camera.positionCartographic, new Cartesian3$2());
    var surfaceNormal = scene.globe.ellipsoid.geodeticSurfaceNormal(center);
    var focusBoundingSphere = new BoundingSphere(center, 0);
    camera.flyToBoundingSphere(focusBoundingSphere, {
      offset: new HeadingPitchRange(0,
      // do not use camera.pitch since the pitch at the center/target is required
      CesiumMath.PI_OVER_TWO - Cartesian3$2.angleBetween(surfaceNormal, camera.directionWC),
      // camera.distanceToBoundingSphere(focusBoundingSphere)
      // instead calculate distance manually
      Cartesian3$2.distance(cameraPosition, center)),
      duration: 1.5
    });
  };
  _NavigationViewModel.create = function (options) {
    var result = new _NavigationViewModel(options);
    result.show(options.container);
    return result;
  };
  function orbit(viewModel, compassElement, cursorVector) {
    var scene = viewModel.terria.scene;
    var sscc = scene.screenSpaceCameraController;
    // do not orbit if it is disabled
    if (scene.mode === SceneMode$2.MORPHING || !sscc.enableInputs) {
      return;
    }
    if (viewModel.navigationLocked) {
      return true;
    }
    switch (scene.mode) {
      case SceneMode$2.COLUMBUS_VIEW:
        if (sscc.enableLook) break;
        if (!sscc.enableTranslate || !sscc.enableTilt) return;
        break;
      case SceneMode$2.SCENE3D:
        if (sscc.enableLook) break;
        if (!sscc.enableTilt || !sscc.enableRotate) return;
        break;
      case SceneMode$2.SCENE2D:
        if (!sscc.enableTranslate) return;
        break;
    }

    // Remove existing event handlers, if any.
    document.removeEventListener('mousemove', viewModel.orbitMouseMoveFunction, false);
    document.removeEventListener('mouseup', viewModel.orbitMouseUpFunction, false);
    if (defined$5(viewModel.orbitTickFunction)) {
      viewModel.terria.clock.onTick.removeEventListener(viewModel.orbitTickFunction);
    }
    viewModel.orbitMouseMoveFunction = undefined;
    viewModel.orbitMouseUpFunction = undefined;
    viewModel.orbitTickFunction = undefined;
    viewModel.isOrbiting = true;
    viewModel.orbitLastTimestamp = getTimestamp$1();
    var camera = scene.camera;
    if (defined$5(viewModel.terria.trackedEntity)) {
      // when tracking an entity simply use that reference frame
      viewModel.orbitFrame = undefined;
      viewModel.orbitIsLook = false;
    } else {
      var center = Utils.getCameraFocus(viewModel.terria, true, centerScratch);
      if (!defined$5(center)) {
        viewModel.orbitFrame = Transforms.eastNorthUpToFixedFrame(camera.positionWC, scene.globe.ellipsoid, newTransformScratch);
        viewModel.orbitIsLook = true;
      } else {
        viewModel.orbitFrame = Transforms.eastNorthUpToFixedFrame(center, scene.globe.ellipsoid, newTransformScratch);
        viewModel.orbitIsLook = false;
      }
    }
    viewModel.orbitTickFunction = function (e) {
      var timestamp = getTimestamp$1();
      var deltaT = timestamp - viewModel.orbitLastTimestamp;
      var rate = (viewModel.orbitCursorOpacity - 0.5) * 2.5 / 1000;
      var distance = deltaT * rate;
      var angle = viewModel.orbitCursorAngle + CesiumMath.PI_OVER_TWO;
      var x = Math.cos(angle) * distance;
      var y = Math.sin(angle) * distance;
      var oldTransform;
      if (viewModel.navigationLocked) {
        return true;
      }
      if (defined$5(viewModel.orbitFrame)) {
        oldTransform = Matrix4.clone(camera.transform, oldTransformScratch);
        camera.lookAtTransform(viewModel.orbitFrame);
      }

      // do not look up/down or rotate in 2D mode
      if (scene.mode === SceneMode$2.SCENE2D) {
        camera.move(new Cartesian3$2(x, y, 0), Math.max(scene.canvas.clientWidth, scene.canvas.clientHeight) / 100 * camera.positionCartographic.height * distance);
      } else {
        if (viewModel.orbitIsLook) {
          camera.look(Cartesian3$2.UNIT_Z, -x);
          camera.look(camera.right, -y);
        } else {
          camera.rotateLeft(x);
          camera.rotateUp(y);
        }
      }
      if (defined$5(viewModel.orbitFrame)) {
        camera.lookAtTransform(oldTransform);
      }
      // viewModel.terria.cesium.notifyRepaintRequired();
      viewModel.orbitLastTimestamp = timestamp;
    };
    function updateAngleAndOpacity(vector, compassWidth) {
      var angle = Math.atan2(-vector.y, vector.x);
      viewModel.orbitCursorAngle = CesiumMath.zeroToTwoPi(angle - CesiumMath.PI_OVER_TWO);
      var distance = Cartesian2$1.magnitude(vector);
      var maxDistance = compassWidth / 2.0;
      var distanceFraction = Math.min(distance / maxDistance, 1.0);
      var easedOpacity = 0.5 * distanceFraction * distanceFraction + 0.5;
      viewModel.orbitCursorOpacity = easedOpacity;
      // viewModel.terria.cesium.notifyRepaintRequired();
    }
    viewModel.orbitMouseMoveFunction = function (e) {
      var compassRectangle = compassElement.getBoundingClientRect();
      var center = new Cartesian2$1((compassRectangle.right - compassRectangle.left) / 2.0, (compassRectangle.bottom - compassRectangle.top) / 2.0);
      var clickLocation = new Cartesian2$1(e.clientX - compassRectangle.left, e.clientY - compassRectangle.top);
      var vector = Cartesian2$1.subtract(clickLocation, center, vectorScratch);
      updateAngleAndOpacity(vector, compassRectangle.width);
    };
    viewModel.orbitMouseUpFunction = function (e) {
      // TODO: if mouse didn't move, reset view to looking down, north is up?
      viewModel.isOrbiting = false;
      document.removeEventListener('mousemove', viewModel.orbitMouseMoveFunction, false);
      document.removeEventListener('mouseup', viewModel.orbitMouseUpFunction, false);
      if (defined$5(viewModel.orbitTickFunction)) {
        viewModel.terria.clock.onTick.removeEventListener(viewModel.orbitTickFunction);
      }
      viewModel.orbitMouseMoveFunction = undefined;
      viewModel.orbitMouseUpFunction = undefined;
      viewModel.orbitTickFunction = undefined;
    };
    document.addEventListener('mousemove', viewModel.orbitMouseMoveFunction, false);
    document.addEventListener('mouseup', viewModel.orbitMouseUpFunction, false);
    viewModel.terria.clock.onTick.addEventListener(viewModel.orbitTickFunction);
    updateAngleAndOpacity(cursorVector, compassElement.getBoundingClientRect().width);
  }
  function rotate(viewModel, compassElement, cursorVector) {
    var scene = viewModel.terria.scene;
    var camera = scene.camera;
    var sscc = scene.screenSpaceCameraController;
    // do not rotate in 2D mode or if rotating is disabled
    if (scene.mode === SceneMode$2.MORPHING || scene.mode === SceneMode$2.SCENE2D || !sscc.enableInputs) {
      return;
    }
    if (viewModel.navigationLocked) {
      return true;
    }
    if (!sscc.enableLook && (scene.mode === SceneMode$2.COLUMBUS_VIEW || scene.mode === SceneMode$2.SCENE3D && !sscc.enableRotate)) {
      return;
    }

    // Remove existing event handlers, if any.
    document.removeEventListener('mousemove', viewModel.rotateMouseMoveFunction, false);
    document.removeEventListener('mouseup', viewModel.rotateMouseUpFunction, false);
    viewModel.rotateMouseMoveFunction = undefined;
    viewModel.rotateMouseUpFunction = undefined;
    viewModel.isRotating = true;
    viewModel.rotateInitialCursorAngle = Math.atan2(-cursorVector.y, cursorVector.x);
    if (defined$5(viewModel.terria.trackedEntity)) {
      // when tracking an entity simply use that reference frame
      viewModel.rotateFrame = undefined;
      viewModel.rotateIsLook = false;
    } else {
      var viewCenter = Utils.getCameraFocus(viewModel.terria, true, centerScratch);
      if (!defined$5(viewCenter) || scene.mode === SceneMode$2.COLUMBUS_VIEW && !sscc.enableLook && !sscc.enableTranslate) {
        viewModel.rotateFrame = Transforms.eastNorthUpToFixedFrame(camera.positionWC, scene.globe.ellipsoid, newTransformScratch);
        viewModel.rotateIsLook = true;
      } else {
        viewModel.rotateFrame = Transforms.eastNorthUpToFixedFrame(viewCenter, scene.globe.ellipsoid, newTransformScratch);
        viewModel.rotateIsLook = false;
      }
    }
    var oldTransform;
    if (defined$5(viewModel.rotateFrame)) {
      oldTransform = Matrix4.clone(camera.transform, oldTransformScratch);
      camera.lookAtTransform(viewModel.rotateFrame);
    }
    viewModel.rotateInitialCameraAngle = -camera.heading;
    if (defined$5(viewModel.rotateFrame)) {
      camera.lookAtTransform(oldTransform);
    }
    viewModel.rotateMouseMoveFunction = function (e) {
      var compassRectangle = compassElement.getBoundingClientRect();
      var center = new Cartesian2$1((compassRectangle.right - compassRectangle.left) / 2.0, (compassRectangle.bottom - compassRectangle.top) / 2.0);
      var clickLocation = new Cartesian2$1(e.clientX - compassRectangle.left, e.clientY - compassRectangle.top);
      var vector = Cartesian2$1.subtract(clickLocation, center, vectorScratch);
      var angle = Math.atan2(-vector.y, vector.x);
      var angleDifference = angle - viewModel.rotateInitialCursorAngle;
      var newCameraAngle = CesiumMath.zeroToTwoPi(viewModel.rotateInitialCameraAngle - angleDifference);
      var camera = viewModel.terria.scene.camera;
      var oldTransform;
      if (defined$5(viewModel.rotateFrame)) {
        oldTransform = Matrix4.clone(camera.transform, oldTransformScratch);
        camera.lookAtTransform(viewModel.rotateFrame);
      }
      var currentCameraAngle = -camera.heading;
      camera.rotateRight(newCameraAngle - currentCameraAngle);
      if (defined$5(viewModel.rotateFrame)) {
        camera.lookAtTransform(oldTransform);
      }

      // viewModel.terria.cesium.notifyRepaintRequired();
    };
    viewModel.rotateMouseUpFunction = function (e) {
      viewModel.isRotating = false;
      document.removeEventListener('mousemove', viewModel.rotateMouseMoveFunction, false);
      document.removeEventListener('mouseup', viewModel.rotateMouseUpFunction, false);
      viewModel.rotateMouseMoveFunction = undefined;
      viewModel.rotateMouseUpFunction = undefined;
    };
    document.addEventListener('mousemove', viewModel.rotateMouseMoveFunction, false);
    document.addEventListener('mouseup', viewModel.rotateMouseUpFunction, false);
  }

  /* eslint-disable no-unused-vars */
  var defined$6 = Cesium.defined;
  var CesiumEvent = Cesium.Event;
  var DeveloperError$2 = Cesium.DeveloperError;
  /**
   * @alias CesiumNavigation
   * @constructor
   *
   * @param {Viewer|CesiumWidget} viewerCesiumWidget The Viewer or CesiumWidget instance
   */
  var CesiumNavigation = function CesiumNavigation(viewerCesiumWidget) {
    initialize.apply(this, arguments);
    this._onDestroyListeners = [];
  };
  CesiumNavigation.prototype.distanceLegendViewModel = undefined;
  CesiumNavigation.prototype.navigationViewModel = undefined;
  CesiumNavigation.prototype.navigationDiv = undefined;
  CesiumNavigation.prototype.distanceLegendDiv = undefined;
  CesiumNavigation.prototype.terria = undefined;
  CesiumNavigation.prototype.container = undefined;
  CesiumNavigation.prototype._onDestroyListeners = undefined;
  CesiumNavigation.prototype._navigationLocked = false;
  CesiumNavigation.prototype.setNavigationLocked = function (locked) {
    this._navigationLocked = locked;
    this.navigationViewModel.setNavigationLocked(this._navigationLocked);
  };
  CesiumNavigation.prototype.getNavigationLocked = function () {
    return this._navigationLocked;
  };
  CesiumNavigation.prototype.destroy = function () {
    if (defined$6(this.navigationViewModel)) {
      this.navigationViewModel.destroy();
    }
    if (defined$6(this.distanceLegendViewModel)) {
      this.distanceLegendViewModel.destroy();
    }
    if (defined$6(this.navigationDiv)) {
      this.navigationDiv.parentNode.removeChild(this.navigationDiv);
    }
    delete this.navigationDiv;
    if (defined$6(this.distanceLegendDiv)) {
      this.distanceLegendDiv.parentNode.removeChild(this.distanceLegendDiv);
    }
    delete this.distanceLegendDiv;
    if (defined$6(this.container)) {
      this.container.parentNode.removeChild(this.container);
    }
    delete this.container;
    for (var i = 0; i < this._onDestroyListeners.length; i++) {
      this._onDestroyListeners[i]();
    }
  };
  CesiumNavigation.prototype.addOnDestroyListener = function (callback) {
    if (typeof callback === 'function') {
      this._onDestroyListeners.push(callback);
    }
  };

  /**
   * @param {Viewer|CesiumWidget} viewerCesiumWidget The Viewer or CesiumWidget instance
   * @param options
   */
  function initialize(viewerCesiumWidget, options) {
    if (!defined$6(viewerCesiumWidget)) {
      throw new DeveloperError$2('CesiumWidget or Viewer is required.');
    }
    var cesiumWidget = defined$6(viewerCesiumWidget.cesiumWidget) ? viewerCesiumWidget.cesiumWidget : viewerCesiumWidget;
    var container = document.createElement('div');
    container.className = 'cesium-widget-cesiumNavigationContainer';
    cesiumWidget.container.appendChild(container);
    this.terria = viewerCesiumWidget;
    this.terria.options = defined$6(options) ? options : {};
    this.terria.afterWidgetChanged = new CesiumEvent();
    this.terria.beforeWidgetChanged = new CesiumEvent();
    this.container = container;
    if (!defined$6(this.terria.options.enableDistanceLegend) || this.terria.options.enableDistanceLegend) {
      this.distanceLegendDiv = document.createElement('div');
      container.appendChild(this.distanceLegendDiv);
      this.distanceLegendDiv.setAttribute('id', 'distanceLegendDiv');
      this.distanceLegendViewModel = DistanceLegendViewModel.create({
        container: this.distanceLegendDiv,
        terria: this.terria,
        mapElement: container,
        enableDistanceLegend: true
      });
    }
    if ((!defined$6(this.terria.options.enableZoomControls) || this.terria.options.enableZoomControls) && (!defined$6(this.terria.options.enableCompass) || this.terria.options.enableCompass)) {
      this.navigationDiv = document.createElement('div');
      this.navigationDiv.setAttribute('id', 'navigationDiv');
      container.appendChild(this.navigationDiv);
      this.navigationViewModel = _NavigationViewModel.create({
        container: this.navigationDiv,
        terria: this.terria,
        enableZoomControls: true,
        enableCompass: true
      });
    } else if (defined$6(this.terria.options.enableZoomControls) && !this.terria.options.enableZoomControls && (!defined$6(this.terria.options.enableCompass) || this.terria.options.enableCompass)) {
      this.navigationDiv = document.createElement('div');
      this.navigationDiv.setAttribute('id', 'navigationDiv');
      container.appendChild(this.navigationDiv);
      this.navigationViewModel = _NavigationViewModel.create({
        container: this.navigationDiv,
        terria: this.terria,
        enableZoomControls: false,
        enableCompass: true
      });
    } else if ((!defined$6(this.terria.options.enableZoomControls) || this.terria.options.enableZoomControls) && defined$6(this.terria.options.enableCompass) && !this.terria.options.enableCompass) {
      this.navigationDiv = document.createElement('div');
      this.navigationDiv.setAttribute('id', 'navigationDiv');
      container.appendChild(this.navigationDiv);
      this.navigationViewModel = _NavigationViewModel.create({
        container: this.navigationDiv,
        terria: this.terria,
        enableZoomControls: true,
        enableCompass: false
      });
    } else if (defined$6(this.terria.options.enableZoomControls) && !this.terria.options.enableZoomControls && defined$6(this.terria.options.enableCompass) && !this.terria.options.enableCompass) ;
  }

  return CesiumNavigation;

})));
//# sourceMappingURL=CesiumNavigation.umd.js.map
