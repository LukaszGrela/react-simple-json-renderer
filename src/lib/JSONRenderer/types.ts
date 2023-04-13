import { FC, ReactNode } from 'react';
import { TEditor } from './Editor/types';
import { TViewer } from './Viewer/types';

export interface IProps<T> {
  data: T;
  children: ReactNode;
  collapsible?: boolean;
}

export interface IJSONRenderer<T = any> extends FC<IProps<T>> {
  Editor: TEditor;
  Viewer: TViewer;
}
