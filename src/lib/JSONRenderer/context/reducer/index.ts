import React, { useEffect, useRef } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import keys from 'lodash/keys';
import get from 'lodash/get';
import set from 'lodash/set';
import has from 'lodash/has';
import { Draft } from 'immer';
import { ImmerReducer, useImmerReducer } from 'use-immer';
import {
  toTreePath,
  getParentPath,
  addPath,
  defaultValueByType,
  treeTraverser,
  fixArrayIndexes,
  stripWrapperPath,
} from '../utils';
import { uniqueId } from '../../utils/string';
import { EBuiltInKeys, TAction, TBuildTreeData, TCallback, TTreeDescription } from '../types';

function castAsDraft<T>(element: T): Draft<T> {
  return element as Draft<T>;
}

type TDataReducer = (callback?: TCallback) => ImmerReducer<TBuildTreeData<any>, TAction>;
const dataReducer: TDataReducer = (callback) => (draft, action) => {
  console.log(action);
  switch (action.type) {
    case 'removeNode':
      {
        const parentPath = getParentPath(action.identifier.path);
        const tree = draft?.[EBuiltInKeys.TREE];
        const wrapper = draft?.[EBuiltInKeys.WRAPPER];
        if (tree && wrapper) {
          const parentIdentifier = get(tree, toTreePath(parentPath));
          const parentData = get(wrapper, parentPath);
          const removedValue = cloneDeep(get(parentData, action.identifier.key));
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

          if (callback) {
            callback(
              action.type,
              stripWrapperPath(action.identifier.path),
              action.identifier.type,
              removedValue,
            );
          }
        }
      }
      break;

    case 'addNode':
      {
        const tree = draft?.[EBuiltInKeys.TREE];
        const wrapper = draft?.[EBuiltInKeys.WRAPPER];
        if (tree && wrapper) {
          // container path
          const containerTreeNode = get(tree, toTreePath(action.identifier.path));
          const containerDataNode = get(wrapper, action.identifier.path);

          const wasEmpty = containerTreeNode.children === undefined;
          const actionData = action.data;
          let key = '';
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
            //
            key = `${list.length - 1}`;
          } else {
            const path = actionData.key;
            key = path;
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
              parentType: containerTreeNode.type,
            };
            // redraw
            containerTreeNode.uniqueId = uniqueId();
            // update children length
            containerTreeNode.childrenLength = keys(containerTreeNode.children).length;
          }

          if (callback) {
            let newValue = actionData.value;
            if (!newValue) {
              newValue = defaultValueByType(actionData.type);
            }

            callback(
              action.type,
              stripWrapperPath(addPath(action.identifier.path, key)),
              actionData.type,
              newValue,
            );
          }
        }
      }
      break;

    case 'updateNode':
      {
        const tree = draft?.[EBuiltInKeys.TREE];
        const wrapper = draft?.[EBuiltInKeys.WRAPPER];
        if (tree && wrapper) {
          const { identifier, update } = action;
          const parentPath = getParentPath(identifier.path);
          // container path
          const containerDataNode = get(wrapper, parentPath);
          if (has(containerDataNode, identifier.key)) {
            if (update.value !== undefined) {
              containerDataNode[identifier.key] = update.value;
            }
            if (update.type !== undefined) {
              const treeNode = get(tree, toTreePath(identifier.path)) as TTreeDescription;
              treeNode.type = update.type;
              // reset children length
              treeNode.childrenLength = 0;
              treeNode.children = undefined;
            }
            if (update.key !== undefined) {
              // Note: key is modifyiable only on objects
              // data
              const value = containerDataNode[identifier.key];
              delete containerDataNode[identifier.key];
              containerDataNode[update.key] = value;
              // tree
              const containerTreeNode = get(tree, toTreePath(parentPath));
              const children = containerTreeNode.children!;
              const treeNode = children[identifier.key];
              delete children[identifier.key];
              // update and move
              treeNode.key = update.key;
              treeNode.path = addPath(parentPath, update.key);
              children[update.key] = treeNode;
            }
            if (callback) {
              callback(
                action.type,
                stripWrapperPath(action.identifier.path),
                action.identifier.type,
                action.update,
              );
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

export function useJSONRendererReducer<T>(
  treeData: TBuildTreeData<T>,
  onChange?: TCallback,
): [state: TBuildTreeData<T>, dispatch: React.Dispatch<TAction>] {
  const updateCallbackRef = useRef(onChange);
  useEffect(() => {
    updateCallbackRef.current = onChange;
  }, [onChange]);

  const [state, dispatch] = useImmerReducer<TBuildTreeData<T>, TAction>(
    dataReducer(updateCallbackRef.current),
    treeData,
  );
  const dispatchRef = useRef(dispatch);

  useEffect(() => {
    dispatchRef.current = dispatch;
  }, [dispatch]);

  return [state, dispatchRef.current];
}
