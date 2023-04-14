import React, { useCallback } from 'react';
import keys from 'lodash/keys';
import get from 'lodash/get';
import set from 'lodash/set';
import has from 'lodash/has';
import { Draft } from 'immer';
import { ImmerReducer, useImmerReducer } from 'use-immer';
import {
  IJSONRendererContext,
  IJSONRendererContextActions,
  IJSONRendererContextConfig,
  IProps,
  TAction,
  TBuildTreeData,
  TTreeDescription,
  TUpdateDetails,
} from './types';
import {
  toTreePath,
  getParentPath,
  addPath,
  defaultValueByType,
  treeTraverser,
  fixArrayIndexes,
} from './utils';
import { uniqueId } from '../utils/string';
import { TDataType } from '../../types';

function castAsDraft<T>(element: T): Draft<T> {
  return element as Draft<T>;
}

const JSONRendererConfig = React.createContext<IJSONRendererContextConfig | undefined>(undefined);
const JSONRendererContext = React.createContext<IJSONRendererContext<any> | undefined>(undefined);
const JSONRendererActions = React.createContext<IJSONRendererContextActions | undefined>(undefined);

const dataReducer: ImmerReducer<TBuildTreeData<any> | undefined, TAction> = (draft, action) => {
  console.log('action', action);

  switch (action.type) {
    case 'removeNode':
      {
        const parentPath = getParentPath(action.identifier.path);
        const tree = draft?.tree;
        const wrapper = draft?.wrapper;
        if (tree && wrapper) {
          const parentIdentifier = get(tree, toTreePath(parentPath));
          const parentData = get(wrapper, parentPath);
          if (parentIdentifier && parentIdentifier.type === 'object' && parentIdentifier.children) {
            delete parentIdentifier.children?.[action.identifier.key];
            delete parentData[action.identifier.key];

            const childrenLength = keys(parentIdentifier.children);
            // if array is empty, remove children
            if (childrenLength.length === 0) {
              delete parentIdentifier.children;
              parentIdentifier.uniqueId = uniqueId();
              parentIdentifier.childrenLength = 0;
            } else {
              // update children length
              parentIdentifier.childrenLength = childrenLength.length;
            }
          }

          if (parentIdentifier && parentIdentifier.type === 'array' && parentIdentifier.children) {
            // delete from source
            const list = castAsDraft<Array<any>>(parentData);
            const oldLength = list.length;
            const index = parseInt(action.identifier.key);
            parentData.splice(index, 1);

            // delete tree element
            delete parentIdentifier.children[action.identifier.key];
            // once array item is removed tree data is out of sync, fix it
            // refresh indexes
            if (parentData.length > 0 && index < parentData.length) {
              for (let i = index + 1; i < oldLength; i++) {
                const element = parentIdentifier.children[`${i}`];
                const oldPath = element.path;
                const newIndex = `${i - 1}`;
                const newPath = addPath(parentPath, newIndex);
                // adjust key and path
                element.key = newIndex;
                element.path = newPath;
                element.uniqueId = uniqueId();
                // move
                delete parentIdentifier.children[`${i}`];
                parentIdentifier.children[newIndex] = element;
                // traverse object/array
                if ((element.type === 'array' || element.type === 'object') && element.children) {
                  fixArrayIndexes(element, oldPath, newPath);
                }
              }
            }

            // if array is empty, remove children
            if (parentData.length === 0) {
              delete parentIdentifier.children;
              parentIdentifier.uniqueId = uniqueId();
              parentIdentifier.childrenLength = 0;
            } else {
              // update children length
              parentIdentifier.childrenLength = parentData.length;
            }
          }
        }
      }
      break;

    case 'addNode':
      {
        const tree = draft?.tree;
        const wrapper = draft?.wrapper;
        if (tree && wrapper) {
          // container path
          const containerTreeNode = get(tree, toTreePath(action.identifier.path));
          const containerDataNode = get(wrapper, action.identifier.path);

          const wasEmpty = containerTreeNode.children === undefined;
          const actionData = action.data;
          // container is an array
          if (actionData.containerType === 'array') {
            const list = castAsDraft<Array<any>>(containerDataNode);
            if (actionData.value) {
              // push value
              list.push(actionData.value);
            } else {
              // push default empty value
              list.push(defaultValueByType(actionData.type));
            }
          } else {
            const path = actionData.key;
            // or object
            if (actionData.value) {
              set(containerDataNode, path, actionData.value);
            } else {
              set(containerDataNode, path, defaultValueByType(actionData.type));
            }
          }

          // update tree node
          if (wasEmpty) {
            treeTraverser(
              containerDataNode,
              action.identifier.path,
              action.identifier.level,
              containerTreeNode,
            );
          } else {
            // create new tree entry
            const children = containerTreeNode.children!;
            const key = (
              actionData.containerType === 'array' ? containerDataNode.length - 1 : actionData.key
            ).toString();
            const path = addPath(action.identifier.path, key);

            children[key] = {
              key,
              level: action.identifier.level + 1,
              type: actionData.type,
              uniqueId: uniqueId(),
              path,
              childrenLength: 0,
            };
            // redraw
            containerTreeNode.uniqueId = uniqueId();
            // update children length
            containerTreeNode.childrenLength = keys(containerTreeNode.children).length;
          }
        }
      }
      break;

    case 'updateNode':
      {
        const tree = draft?.tree;
        const wrapper = draft?.wrapper;
        if (tree && wrapper) {
          const { identifier, update } = action;
          const parentPath = getParentPath(identifier.path);
          // container path
          const containerDataNode = get(wrapper, parentPath);
          console.log('containerDataNode', JSON.stringify(containerDataNode), identifier.key);
          if (has(containerDataNode, identifier.key)) {
            if (update.value !== undefined) {
              containerDataNode[identifier.key] = update.value;
            }
          } else {
            console.warn('Node not found', identifier.path, JSON.stringify(wrapper));
          }
        }
      }
      break;
    default:
      console.warn('Unknown action', action);
      break;
  }
};

export function JSONRendererProvider<T>({
  children,
  treeData,
  collapsible = true,
  viewerUseQuotes = false,
}: IProps<T>): JSX.Element {
  console.log('JSONRendererProvider');

  const [state, dispatch] = useImmerReducer<TBuildTreeData<T> | undefined, TAction>(
    dataReducer,
    treeData,
  );

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

  const value = { treeData: state } as IJSONRendererContext<T>;
  const config: IJSONRendererContextConfig = {
    collapsible,
    viewerUseQuotes,
  };
  return (
    <JSONRendererConfig.Provider value={config}>
      <JSONRendererContext.Provider value={value}>
        <JSONRendererActions.Provider value={{ updateNode, removeNode, addNode }}>
          {children}
        </JSONRendererActions.Provider>
      </JSONRendererContext.Provider>
    </JSONRendererConfig.Provider>
  );
}

export function useJSONRendererContext() {
  const context = React.useContext(JSONRendererContext);
  if (context === undefined) {
    throw new Error('useJSONRendererContext must be used within a JSONRendererContext');
  }
  return context;
}

export function useJSONRendererContextActions() {
  const context = React.useContext(JSONRendererActions);
  if (context === undefined) {
    throw new Error('useJSONRendererContextActions must be used within a JSONRendererActions');
  }
  return context;
}

export function useJSONRendererContextConfig() {
  const context = React.useContext(JSONRendererConfig);
  if (context === undefined) {
    throw new Error('useJSONRendererContextConfig must be used within a JSONRendererConfig');
  }
  return context;
}
