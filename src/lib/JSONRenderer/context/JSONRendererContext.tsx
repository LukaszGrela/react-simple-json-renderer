import React from 'react';
import { IProps, TAction, TBuildTreeData } from './types';
import { useJSONRendererReducer } from './reducer';

const JSONRendererContext = React.createContext<TBuildTreeData<any> | undefined>(undefined);
const JSONRendererContextDispatch = React.createContext<React.Dispatch<TAction> | undefined>(
  undefined,
);

export function JSONRendererProvider<T>({ children, treeData, onChange }: IProps<T>): JSX.Element {
  const [state, dispatch] = useJSONRendererReducer<T>(treeData, onChange);

  return (
    <JSONRendererContext.Provider value={state}>
      <JSONRendererContextDispatch.Provider value={dispatch}>
        {children}
      </JSONRendererContextDispatch.Provider>
    </JSONRendererContext.Provider>
  );
}

export function useJSONRendererContext<T>(): TBuildTreeData<T> {
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
