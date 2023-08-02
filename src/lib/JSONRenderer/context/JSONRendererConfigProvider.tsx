import React, { PropsWithChildren, useEffect } from 'react';
import { useObservable } from '@legendapp/state/react';
import { Observable } from '@legendapp/state';
import { IJSONRendererContextConfig } from './types';

const JSONRendererConfig = React.createContext<Observable<IJSONRendererContextConfig> | undefined>(
  undefined,
);

export function JSONRendererConfigProvider({
  children,
  ...config
}: PropsWithChildren<IJSONRendererContextConfig>): JSX.Element {
  const state = useObservable(config);

  useEffect(() => {
    state.set(config);
  }, [state, config]);

  return <JSONRendererConfig.Provider value={state}>{children}</JSONRendererConfig.Provider>;
}

export function useJSONRendererContextConfig() {
  const context = React.useContext(JSONRendererConfig);

  if (context === undefined) {
    throw new Error('useJSONRendererContextConfig must be used within a JSONRendererConfig');
  }

  return context;
}
