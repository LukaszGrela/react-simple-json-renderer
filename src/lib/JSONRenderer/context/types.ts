import { ReactNode } from 'react';
import { TDataType } from '../../types';

export interface IProps<T> {
  treeData: TBuildTreeData<T>;
  children: ReactNode;
  // config
  collapsible?: boolean;
}
export type TTreeDescription = {
  uniqueId: string;
  key: string;
  path: string;
  type: TDataType;
  level: number;
  children?: TTree;
};
export type TTree = { [key: string]: TTreeDescription };

export type TBuildTreeData<T> = {
  wrapper: { root: T };
  tree: TTree;
  changeIdentifier: string;
};
export interface IJSONRendererContextActions {
  addNode: (descriptor: TTreeDescription, newType: TDataType, key: string, newValue?: any) => void;
  removeNode: (descriptor: TTreeDescription) => void;
  updateNode: (descriptor: TTreeDescription) => void;
}
export interface IJSONRendererContext<T> {
  treeData: TBuildTreeData<T>;
}

export interface IJSONRendererContextConfig {
  collapsible: boolean;
}

export interface IContextAction {
  type: string;
  identifier: TTreeDescription;
}
export interface IRemoveNodeAction extends IContextAction {
  type: 'removeNode';
}
export interface IAddNodeAction extends IContextAction {
  type: 'addNode';
  data: {
    type: TDataType;
    key: string;
    value?: any;
  };
}

export type TAction = IRemoveNodeAction | IAddNodeAction;
