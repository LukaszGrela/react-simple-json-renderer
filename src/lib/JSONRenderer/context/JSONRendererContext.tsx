import React, { useCallback } from 'react';
import keys from 'lodash/keys';
import get from 'lodash/get';
import set from 'lodash/set';
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

            // if array is empty, remove children
            if (keys(parentIdentifier.children).length === 0) {
              delete parentIdentifier.children;
              parentIdentifier.uniqueId = uniqueId();
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

          // container is an array
          if (action.identifier.type === 'array') {
            const list = castAsDraft<Array<any>>(containerDataNode);
            if (action.data.value) {
              // push value
              list.push(action.data.value);
            } else {
              // push default empty value
              list.push(defaultValueByType(action.data.type));
            }
          } else {
            const path = action.data.key;
            // or object
            if (action.data.value) {
              set(containerDataNode, path, action.data.value);
            } else {
              set(containerDataNode, path, defaultValueByType(action.data.type));
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
              action.identifier.type === 'array' ? containerDataNode.length - 1 : action.data.key
            ).toString();
            const path = addPath(action.identifier.path, key);

            children[key] = {
              key,
              level: action.identifier.level + 1,
              type: action.data.type,
              uniqueId: uniqueId(),
              path,
            };
            // redraw
            containerTreeNode.uniqueId = uniqueId();
          }
        }
      }
      break;
    default:
      break;
  }
};

export function JSONRendererProvider<T>({
  children,
  treeData,
  collapsible = true,
}: IProps<T>): JSX.Element {
  console.log('JSONRendererProvider');

  const [state, dispatch] = useImmerReducer<TBuildTreeData<T> | undefined, TAction>(
    dataReducer,
    treeData,
  );

  const removeNode = useCallback(
    (descriptor: TTreeDescription): void => {
      console.log('Attempt to remove node', descriptor.path, 'of type', descriptor.type);
      dispatch({
        type: 'removeNode',
        identifier: descriptor,
      });
    },
    [dispatch],
  );
  const addNode = useCallback(
    (descriptor: TTreeDescription, newType: TDataType, key: string, newValue?: any) => {
      console.log(
        'Attempt to add new node to',
        descriptor.path,
        'of type',
        descriptor.type,
        'with new value and type',
        newType,
        key,
        newValue,
      );
      dispatch({
        type: 'addNode',
        identifier: descriptor,
        data: {
          type: newType,
          value: newValue,
          key,
        },
      });
    },
    [dispatch],
  );
  const updateNode = useCallback((descriptor: TTreeDescription) => {
    console.log('Update', descriptor);
  }, []);

  const value = { treeData: state } as IJSONRendererContext<T>;
  const config: IJSONRendererContextConfig = {
    collapsible,
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
