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
  childrenLength: number;
};
export type TTree = { [key: string]: TTreeDescription };

export type TBuildTreeData<T> = {
  wrapper: { root: T };
  tree: TTree;
  changeIdentifier: string;
};

type TUpdateProps = {
  value: any;
  type: TDataType;
  key: string;
};

type TPickPartial<T, K extends keyof T> = Pick<T, K> & Omit<Partial<T>, K>;

type TUpdateValue = TPickPartial<TUpdateProps, 'value'>;
type TUpdateType = TPickPartial<TUpdateProps, 'type'>;
type TUpdateKey = TPickPartial<TUpdateProps, 'key'>;

export type TUpdateDetails = TUpdateValue | TUpdateType | TUpdateKey;

export interface IJSONRendererContextActions {
  addNode: (descriptor: TTreeDescription, newType: TDataType, key?: string, newValue?: any) => void;
  removeNode: (descriptor: TTreeDescription) => void;
  updateNode: (descriptor: TTreeDescription, update: TUpdateDetails) => void;
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

type TObjectNodeData = {
  containerType: 'object';
  key: string;
};
type TArrayNodeData = {
  containerType: 'array';
};
type TNodeData = {
  type: TDataType;
  value?: any;
};

export interface IAddNodeAction extends IContextAction {
  type: 'addNode';
  data: (TArrayNodeData | TObjectNodeData) & TNodeData;
}

export interface IUpdateNodeAction extends IContextAction {
  type: 'updateNode';
  identifier: TTreeDescription;
  update: TUpdateDetails;
}

export type TAction = IRemoveNodeAction | IAddNodeAction | IUpdateNodeAction;
