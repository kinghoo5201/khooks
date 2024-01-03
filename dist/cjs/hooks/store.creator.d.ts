type IEvent<IInitState> = (store: IInitState) => void;
/** store对象 */
declare class Store<InitState extends Object> {
  constructor(initState: InitState);
  private eventList;
  state: InitState;
  /** 设置store的值 */
  setData: <Key extends keyof InitState>(key: Key, value: InitState[Key]) => this;
  /** 以對象的形式設置store */
  setDataObject: (data: Partial<InitState>) => this;
  private triggerEvent;
  /** 值变更通知回调注册 */
  onChange: (fn: IEvent<InitState>) => this;
  /** 取消注册变更回调 */
  offChange: (fn?: IEvent<InitState>) => this;
}
/** 快捷創建一個store類型的上下文 */
export default function storeCreator<InitState extends Object>(
  initState: InitState,
): {
  useInitStore: () => {
    state: InitState;
    setData: <Key extends keyof InitState>(key: Key, value: InitState[Key]) => Store<InitState>;
    setDataObject: (data: Partial<InitState>) => Store<InitState>;
  };
  useStoreContext: () => {
    state: InitState;
    setData: <Key extends keyof InitState>(key: Key, value: InitState[Key]) => Store<InitState>;
    setDataObject: (data: Partial<InitState>) => Store<InitState>;
  };
  STORE_CONTEXT: import('react').Context<{
    state: InitState;
    setData: <Key extends keyof InitState>(key: Key, value: InitState[Key]) => Store<InitState>;
    setDataObject: (data: Partial<InitState>) => Store<InitState>;
  }>;
  initContext: {
    state: InitState;
    setData: <Key extends keyof InitState>(key: Key, value: InitState[Key]) => Store<InitState>;
    setDataObject: (data: Partial<InitState>) => Store<InitState>;
  };
  storeInstance: Store<InitState>;
};
export {};
