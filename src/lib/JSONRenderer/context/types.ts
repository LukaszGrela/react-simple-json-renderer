import { ReactNode } from 'react';
import { TDataType } from '../../types';

export enum EBuiltInKeys {
  ROOT = '$__root',

  UNIQUE_ID = '$__uniqueId',
  KEY = '$__key',
  PATH = '$__path',
  TYPE = '$__type',
  PARENT_TYPE = '$__parentType',
  LEVEL = '$__level',
  CHILDREN = '$__children',
  CHILDREN_LENGTH = '$__childrenLength',
  WRAPPER = '$__wrapper',
  TREE = '$__tree',
  CHANGE_IDENTIFIER = '$__changeIdentifier',
}

export interface IProps<T> {
  treeData: TBuildTreeData<T>;
  children: ReactNode;
  onChange?: TCallback;
}
export type TTreeDescription = {
  uniqueId: string;
  key: string;
  path: string;
  type: TDataType;
  parentType: TDataType | null;
  level: number;
  children?: TTree;
  childrenLength: number;
};
export type TTree = { [key: string]: TTreeDescription };

export type TBuildTreeData<T> = {
  [EBuiltInKeys.WRAPPER]: { [EBuiltInKeys.ROOT]: T };
  [EBuiltInKeys.TREE]: TTree;
  [EBuiltInKeys.CHANGE_IDENTIFIER]: string;
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

export interface IJSONRendererContextConfig {
  collapsible: boolean;
  viewerUseQuotes: boolean;
  hideRootName: boolean;
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

export type TCallback = (
  type: TAction['type'],
  path: string,
  dataType: TDataType,
  value?: any,
) => void;
