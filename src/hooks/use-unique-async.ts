// UseUniqueAsync
// @description 防止重复请求、防止组件销毁后执行setState、支持防抖
// @author kinghoo
import { useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import isNil from 'lodash/isNil';

/** 防止重复请求用,并且检测是否unmount */
export function useUniqueAsync<Parameter extends any[], Result extends any>(
  fn: (...args: Parameter) => Promise<Result>,
  /** 防抖时间配置，只有初始化就确定，不配置无防抖 */
  debounceTime?: number,
) {
  const reqId = useRef<number>();
  const isunmount = useRef(false);
  const [loading, setLoading] = useState(false);
  const $fn = useRef(fn);
  $fn.current = fn;
  const [response, setResponse] = useState<Result>();
  const $loading = useRef(loading);
  const $response = useRef(response);
  $response.current = response;
  $loading.current = loading;

  // @ts-ignore
  const asyncFn: (...args: Parameter) => Promise<Result> = useMemo(() => {
    const fnBody = async (...args: Parameter) => {
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
    if (isNil(debounceTime) || debounceTime < 0) {
      return fnBody;
    }
    return debounce((...args: Parameter) => {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fnBody(...args);
          resolve(res);
        } catch (e) {
          reject(e);
        }
      });
    }, debounceTime);
  }, []);

  useEffect(
    () => () => {
      isunmount.current = true;
    },
    [],
  );

  return {
    response,
    asyncFn,
    loading,
    $response,
    $loading,
  };
}
