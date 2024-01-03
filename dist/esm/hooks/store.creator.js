function _typeof(obj) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              'function' == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj;
          }),
    _typeof(obj)
  );
}
function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}
function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i =
    null == arr
      ? null
      : ('undefined' != typeof Symbol && arr[Symbol.iterator]) || arr['@@iterator'];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (((_x = (_i = _i.call(arr)).next), 0 === i)) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else
        for (
          ;
          !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i);
          _n = !0
        );
    } catch (err) {
      (_d = !0), (_e = err);
    } finally {
      try {
        if (!_n && null != _i.return && ((_r = _i.return()), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
  }
  return target;
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, 'prototype', { writable: false });
  return Constructor;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, 'string');
  return _typeof(key) === 'symbol' ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== 'object' || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || 'default');
    if (_typeof(res) !== 'object') return res;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (hint === 'string' ? String : Number)(input);
}
// StoreCreator
// @description 快捷创建store工厂方法
// @author kinghoo
import { createContext, useContext, useLayoutEffect, useState } from 'react';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import isPlainObject from 'lodash/isPlainObject';
/** store对象 */
var Store = /*#__PURE__*/ _createClass(function Store(initState) {
  var _this = this;
  _classCallCheck(this, Store);
  _defineProperty(this, 'eventList', []);
  _defineProperty(this, 'state', void 0);
  /** 设置store的值 */
  _defineProperty(this, 'setData', function (key, value) {
    var copy = cloneDeep(_this.state);
    // @ts-ignore
    set(copy, key, value);
    _this.state = copy;
    _this.triggerEvent();
    return _this;
  });
  /** 以對象的形式設置store */
  _defineProperty(this, 'setDataObject', function (data) {
    var copy = cloneDeep(_this.state);
    copy = _objectSpread(_objectSpread({}, copy), data);
    _this.state = copy;
    _this.triggerEvent();
    return _this;
  });
  _defineProperty(this, 'triggerEvent', function () {
    _this.eventList.forEach(function (fn) {
      fn(_this.state);
    });
  });
  /** 值变更通知回调注册 */
  _defineProperty(this, 'onChange', function (fn) {
    if (fn && !_this.eventList.includes(fn)) {
      _this.eventList.push(fn);
    }
    return _this;
  });
  /** 取消注册变更回调 */
  _defineProperty(this, 'offChange', function (fn) {
    if (fn) {
      _this.eventList = _this.eventList.filter(function (item) {
        return item !== fn;
      });
    } else {
      _this.eventList = [];
    }
    return _this;
  });
  if (!initState || !isPlainObject(initState)) {
    throw new Error('initState must be a plain object!!!');
  }
  this.state = initState;
});
/** 快捷創建一個store類型的上下文 */
export default function storeCreator(initState) {
  /** store實例 */
  var storeInstance = new Store(initState);
  /** 初始化上下文 */
  var initContext = {
    state: storeInstance.state,
    setData: storeInstance.setData,
    setDataObject: storeInstance.setDataObject,
  };

  /** 上下文 */
  var STORE_CONTEXT = /*#__PURE__*/ createContext(initContext);

  /** 獲取上下文的hooks */
  function useStoreContext() {
    return useContext(STORE_CONTEXT);
  }

  /** 初始化的hooks */
  function useInitStore() {
    var _useState = useState(initContext),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    useLayoutEffect(function () {
      var handleChange = function handleChange(store) {
        setState(function (prevState) {
          return _objectSpread(
            _objectSpread({}, prevState),
            {},
            {
              state: store,
            },
          );
        });
      };
      storeInstance.onChange(handleChange);
      return function () {
        storeInstance.offChange(handleChange);
      };
    }, []);
    return state;
  }
  return {
    useInitStore: useInitStore,
    useStoreContext: useStoreContext,
    STORE_CONTEXT: STORE_CONTEXT,
    initContext: initContext,
    storeInstance: storeInstance,
  };
}
