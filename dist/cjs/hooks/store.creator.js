var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', { value: mod, enumerable: true })
      : target,
    mod,
  )
);
var __toCommonJS = (mod) => __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// src/hooks/store.creator.ts
var store_creator_exports = {};
__export(store_creator_exports, {
  default: () => storeCreator,
});
module.exports = __toCommonJS(store_creator_exports);
var import_react = require('react');
var import_set = __toESM(require('lodash/set'));
var import_cloneDeep = __toESM(require('lodash/cloneDeep'));
var import_isPlainObject = __toESM(require('lodash/isPlainObject'));
var Store = class {
  constructor(initState) {
    this.eventList = [];
    /** 设置store的值 */
    this.setData = (key, value) => {
      const copy = (0, import_cloneDeep.default)(this.state);
      (0, import_set.default)(copy, key, value);
      this.state = copy;
      this.triggerEvent();
      return this;
    };
    /** 以對象的形式設置store */
    this.setDataObject = (data) => {
      let copy = (0, import_cloneDeep.default)(this.state);
      copy = {
        ...copy,
        ...data,
      };
      this.state = copy;
      this.triggerEvent();
      return this;
    };
    this.triggerEvent = () => {
      this.eventList.forEach((fn) => {
        fn(this.state);
      });
    };
    /** 值变更通知回调注册 */
    this.onChange = (fn) => {
      if (fn && !this.eventList.includes(fn)) {
        this.eventList.push(fn);
      }
      return this;
    };
    /** 取消注册变更回调 */
    this.offChange = (fn) => {
      if (fn) {
        this.eventList = this.eventList.filter((item) => item !== fn);
      } else {
        this.eventList = [];
      }
      return this;
    };
    if (!initState || !(0, import_isPlainObject.default)(initState)) {
      throw new Error('initState must be a plain object!!!');
    }
    this.state = initState;
  }
};
function storeCreator(initState) {
  const storeInstance = new Store(initState);
  const initContext = {
    state: storeInstance.state,
    setData: storeInstance.setData,
    setDataObject: storeInstance.setDataObject,
  };
  const STORE_CONTEXT = (0, import_react.createContext)(initContext);
  function useStoreContext() {
    return (0, import_react.useContext)(STORE_CONTEXT);
  }
  function useInitStore() {
    const [state, setState] = (0, import_react.useState)(initContext);
    (0, import_react.useLayoutEffect)(() => {
      const handleChange = (store) => {
        setState((prevState) => {
          return {
            ...prevState,
            state: store,
          };
        });
      };
      storeInstance.onChange(handleChange);
      return () => {
        storeInstance.offChange(handleChange);
      };
    }, []);
    return state;
  }
  return {
    useInitStore,
    useStoreContext,
    STORE_CONTEXT,
    initContext,
    storeInstance,
  };
}
