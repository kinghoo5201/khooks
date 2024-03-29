// StoreCreator
// @description 快捷创建store工厂方法
// @author kinghoo
import React from 'react';
import { createContext, useContext, useLayoutEffect, useState } from 'react';
import isPlainObject from 'lodash/isPlainObject';

type IEvent<IInitState> = (store: IInitState) => void;

/** store对象 */
class Store<InitState extends Object> {
  constructor(initState: InitState) {
    if (!initState || !isPlainObject(initState)) {
      throw new Error('initState must be a plain object!!!');
    }
    this.state = initState;
  }

  private eventList: IEvent<InitState>[] = [];
  public state!: InitState;

  /** 设置store的值 */
  public setData = <Key extends keyof InitState>(key: Key, value: InitState[Key]) => {
    this.state = {
      ...this.state,
      [key]: value,
    };
    this.triggerEvent();
    return this;
  };

  /** 以對象的形式設置store */
  public setDataObject = (data: Partial<InitState>) => {
    this.state = {
      ...this.state,
      ...data,
    };
    this.triggerEvent();
    return this;
  };

  private triggerEvent = () => {
    this.eventList.forEach((fn) => {
      fn(this.state);
    });
  };

  /** 值变更通知回调注册 */
  public onChange = (fn: IEvent<InitState>) => {
    if (fn && !this.eventList.includes(fn)) {
      this.eventList.push(fn);
    }
    return this;
  };

  /** 取消注册变更回调 */
  public offChange = (fn?: IEvent<InitState>) => {
    if (fn) {
      this.eventList = this.eventList.filter((item) => item !== fn);
    } else {
      this.eventList = [];
    }
    return this;
  };
}

/** 快捷創建一個store類型的上下文 */
export function storeCreator<InitState extends Object>(initState: InitState) {
  /** store實例 */
  const storeInstance = new Store(initState);
  /** 初始化上下文 */
  const initContext = {
    state: storeInstance.state,
    setData: storeInstance.setData,
    setDataObject: storeInstance.setDataObject,
  };

  /** 上下文 */
  const STORE_CONTEXT = createContext(initContext);

  /** 獲取上下文的hooks */
  function useStoreContext() {
    return useContext(STORE_CONTEXT);
  }

  /** 初始化的hooks */
  function useInitStore() {
    const [state, setState] = useState(initContext);

    useLayoutEffect(() => {
      const handleChange: IEvent<InitState> = (store) => {
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

  /** 直接提供封装好的provider */
  function Provider(props: React.PropsWithChildren) {
    const store = useInitStore();
    return <STORE_CONTEXT.Provider value={store}>{props.children}</STORE_CONTEXT.Provider>;
  }

  return {
    useInitStore,
    useStoreContext,
    STORE_CONTEXT,
    initContext,
    storeInstance,
    Provider,
  };
}
