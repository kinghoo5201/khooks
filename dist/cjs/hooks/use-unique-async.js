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

// src/hooks/use-unique-async.ts
var use_unique_async_exports = {};
__export(use_unique_async_exports, {
  default: () => useUniqueAsync,
});
module.exports = __toCommonJS(use_unique_async_exports);
var import_react = require('react');
var import_debounce = __toESM(require('lodash/debounce'));
var import_isNil = __toESM(require('lodash/isNil'));
function useUniqueAsync(fn, debounceTime) {
  const reqId = (0, import_react.useRef)();
  const isunmount = (0, import_react.useRef)(false);
  const [loading, setLoading] = (0, import_react.useState)(false);
  const $fn = (0, import_react.useRef)(fn);
  $fn.current = fn;
  const [response, setResponse] = (0, import_react.useState)();
  const asyncFn = (0, import_react.useCallback)(
    (() => {
      const fnBody = async (...args) => {
        try {
          setLoading(true);
          const requestId = Date.now();
          reqId.current = requestId;
          const res = await $fn.current(...args);
          if (reqId.current !== requestId || isunmount.current) return;
          setLoading(false);
          setResponse(res);
          return res;
        } catch (e) {
          setLoading(false);
          throw e;
        }
      };
      if ((0, import_isNil.default)(debounceTime) || debounceTime < 0) {
        return fnBody;
      }
      return (0, import_debounce.default)(fnBody, debounceTime);
    })(),
    [],
  );
  (0, import_react.useEffect)(
    () => () => {
      isunmount.current = true;
    },
    [],
  );
  return { response, asyncFn, loading };
}
