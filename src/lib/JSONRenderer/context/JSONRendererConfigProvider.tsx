import React, { PropsWithChildren, useMemo } from 'react';
import { IJSONRendererContextConfig } from './types';

const JSONRendererConfig = React.createContext<IJSONRendererContextConfig | undefined>(undefined);

export function JSONRendererConfigProvider({
  children,
  ...config
}: PropsWithChildren<IJSONRendererContextConfig>): JSX.Element {
  return <JSONRendererConfig.Provider value={config}>{children}</JSONRendererConfig.Provider>;
}

export function useJSONRendererContextConfig() {
  const context = React.useContext(JSONRendererConfig);
  if (context === undefined) {
    throw new Error('useJSONRendererContextConfig must be used within a JSONRendererConfig');
  }
  return useMemo(() => context, [context]);
}
