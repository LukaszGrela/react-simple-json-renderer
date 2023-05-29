import { FC, ReactNode } from 'react';
import { TCallback } from './context';
import { TEditor } from './Editor/types';
import { TViewer } from './Viewer/types';

export interface IProps<T> {
  data: T;
  children: ReactNode;
  collapsible?: boolean;
  viewerUseQuotes?: boolean;
  onChange?: TCallback;
}

export interface IJSONRenderer<T = any> extends FC<IProps<T>> {
  Editor: TEditor;
  Viewer: TViewer;
}
