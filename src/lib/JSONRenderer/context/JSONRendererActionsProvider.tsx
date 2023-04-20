import { IJSONRendererContextActions, TTreeDescription, TUpdateDetails } from './types';

import { useJSONRendererContextDispatch } from './JSONRendererContext';
import React, { ReactNode, useCallback } from 'react';
import { TDataType } from '../../types';

const JSONRendererActions = React.createContext<IJSONRendererContextActions | undefined>(undefined);

export function JSONRendererActionsProvider({ children }: { children: ReactNode }): JSX.Element {
  const dispatch = useJSONRendererContextDispatch();
  const removeNode = useCallback(
    (descriptor: TTreeDescription): void => {
      dispatch({
        type: 'removeNode',
        identifier: descriptor,
      });
    },
    [dispatch],
  );
  const addNode = useCallback(
    (descriptor: TTreeDescription, newType: TDataType, key?: string, newValue?: any) => {
      if (descriptor.type === 'array') {
        dispatch({
          type: 'addNode',
          identifier: descriptor,
          data: {
            containerType: 'array',
            type: newType,
            value: newValue,
          },
        });
      } else {
        if (key) {
          dispatch({
            type: 'addNode',
            identifier: descriptor,
            data: {
              containerType: 'object',
              type: newType,
              value: newValue,
              key,
            },
          });
        } else {
          console.warn('Missing key parameter');
        }
      }
    },
    [dispatch],
  );
  const updateNode = useCallback(
    (descriptor: TTreeDescription, update: TUpdateDetails): void => {
      dispatch({
        type: 'updateNode',
        identifier: descriptor,
        update,
      });
    },
    [dispatch],
  );
  return (
    <JSONRendererActions.Provider value={{ updateNode, removeNode, addNode }}>
      {children}
    </JSONRendererActions.Provider>
  );
}

export function useJSONRendererContextActions() {
  const context = React.useContext(JSONRendererActions);
  if (context === undefined) {
    throw new Error('useJSONRendererContextActions must be used within a JSONRendererActions');
  }
  return context;
}
