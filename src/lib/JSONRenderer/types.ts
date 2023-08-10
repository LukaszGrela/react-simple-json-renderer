import { FC, ReactNode } from 'react';
import type { IJSONRendererContextConfig, TCallback } from './context';
import {
  Observable,
  ObservableArray,
  ObservableBaseFns,
  ObservableObject,
  ObservablePrimitiveBaseFns,
} from '@legendapp/state';
import type { TEditor } from './Editor/types';
import type { TViewer } from './Viewer/types';
import {
  guardIsPrimitiveValue,
  TJSONValue,
  type TJSONArray,
  type TJSONObject,
  type TJSONPrimitiveValue,
  TDataType,
} from '../types';

export interface IProps<T> {
  data: T;
  children: ReactNode;
  collapsible?: boolean;
  viewerUseQuotes?: boolean;
  hideRootName?: boolean;
  onChange?: TCallback;
  config?: Partial<IJSONRendererContextConfig>;
}

export interface IJSONRenderer<T = any> extends FC<IProps<T>> {
  Editor: TEditor;
  Viewer: TViewer;
}

export const guardArrayObservable = (
  test: ObservableBaseFns<unknown>,
): test is ObservableArray<TJSONArray> => {
  return Array.isArray(test.peek());
};
export const guardPrimitiveObservable = (
  test: ObservableBaseFns<unknown>,
): test is ObservablePrimitiveBaseFns<TJSONPrimitiveValue> => {
  return guardIsPrimitiveValue(test.peek());
};
export const guardObjectObservable = (
  test: ObservableBaseFns<unknown>,
): test is ObservableObject<TJSONObject> => {
  return !guardPrimitiveObservable(test) && !guardArrayObservable(test);
};

/**
 * Type for item component rendered with `For` component
 */
export type TForItem<T extends TJSONValue> = {
  id?: string;
  item: Observable<T>;
};

/**
 * Base component type
 */
export type TElement = {
  level?: number;
  className?: string;
  parentName?: string;
  parentType?: TDataType;
};
