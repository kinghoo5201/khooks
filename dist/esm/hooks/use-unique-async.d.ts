/** 防止重复请求用,并且检测是否unmount */
export default function useUniqueAsync<Parameter extends any[], Result extends any>(
  fn: (...args: Parameter) => Promise<Result>,
  /** 防抖时间配置，只有初始化就确定，不配置无防抖 */
  debounceTime?: number,
): {
  response: Result | undefined;
  asyncFn:
    | ((...args: Parameter) => Promise<Result | undefined>)
    | import('lodash').DebouncedFunc<(...args: Parameter) => Promise<Result | undefined>>;
  loading: boolean;
};
