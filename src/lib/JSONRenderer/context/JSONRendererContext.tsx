import React, { useEffect } from 'react';
import { useObservable } from '@legendapp/state/react';
import { EBuiltInKeys, IProps, TAction, TBuildTreeData } from './types';
import { useJSONRendererReducer } from './reducer';
import { TJSONValue } from '../../types';
import { Observable } from '@legendapp/state';

const JSONRendererContext = React.createContext<Observable<TJSONValue> | undefined>(undefined);
const JSONRendererContextDispatch = React.createContext<React.Dispatch<TAction> | undefined>(
  undefined,
);

export function JSONRendererProvider<T>({
  children,
  treeData,
  onChange,
  data,
}: IProps<T>): JSX.Element {
  const state = useObservable(data);
  useEffect(() => {
    state.set(data);
  }, [state, data]);

  const [state2, dispatch] = useJSONRendererReducer<T>(
    treeData || ({} as TBuildTreeData<T>),
    onChange,
  );

  return (
    <JSONRendererContext.Provider value={state}>
      <JSONRendererContextDispatch.Provider value={dispatch}>
        {children}
      </JSONRendererContextDispatch.Provider>
    </JSONRendererContext.Provider>
  );
}

export function useJSONRendererContext(): Observable<TJSONValue> {
  const context = React.useContext(JSONRendererContext);
  if (context === undefined) {
    throw new Error('useJSONRendererContext must be used within a JSONRendererContext');
  }
  return context;
}

export function useJSONRendererContextDispatch() {
  const context = React.useContext(JSONRendererContextDispatch);
  if (context === undefined) {
    throw new Error(
      'useJSONRendererContextDispatch must be used within a JSONRendererContextDispatch',
    );
  }
  return context;
}

type TUseSelectorCallback<R = any> = (state: R) => R;
export function useSelector<R = any>(callback: TUseSelectorCallback<R>): R {
  const context: Observable<TJSONValue> | undefined = React.useContext(JSONRendererContext);
  if (context === undefined) {
    throw new Error('useSelector must be used within a JSONRendererContext');
  }

  return callback(context as any);
}
