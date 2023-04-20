import keys from 'lodash/keys';
import cloneDeep from 'lodash/cloneDeep';
import { TBuildTreeData, TTree, TTreeDescription } from './types';
import { uniqueId } from '../utils/string';
import { TDataType } from '../../types';

/**
 * Add path element to the end of base path
 * @param basePath base path
 * @param pathElement path element to combine with base path
 * @returns new path
 */
export const addPath = (basePath = '', pathElement = ''): string => {
  if (!basePath) return pathElement;
  if (!pathElement) return basePath;

  return `${basePath}.${pathElement}`;
};

/**
 * Convert the data path to the `TTree` path.
 * @param path data path
 * @returns Path to be used with `TTree` object
 */
export const toTreePath = (path: string) => path.replaceAll('.', '.children.');

/**
 * Returns parent data path
 * @param path path to extract the parent path
 * @returns parent path
 */
export const getParentPath = (path: string): string => path.substring(0, path.lastIndexOf('.'));

/**
 * Retrieves the last path element
 * @param path path to extract last element
 * @returns last element
 */
export const getLastPath = (path: string): string => path.substring(path.lastIndexOf('.') + 1);

export function treeTraverser<N>(
  node: N,
  parentPath: string,
  level: number,
  parentTree: TTreeDescription,
) {
  // read all keys of node object
  keys(node).forEach((key) => {
    const parentNode = node as { [key: string | number]: any };
    // node can be either array or object here (indexed with string or number)
    const currentElement = parentNode[key];
    switch (typeof currentElement) {
      case 'bigint':
      case 'function':
      case 'symbol':
        {
          console.warn(
            'Non parseable content will be removed',
            typeof currentElement,
            currentElement,
          );
          // delete invalid content
          if (parentTree.type === 'object') {
            delete parentNode[key];
          }
          if (parentTree.type === 'array') {
            const list = parentNode as any[];
            const index = parseInt(key);
            list.splice(index, 1);
          }
        }
        break;
      case 'boolean':
      case 'number':
      case 'string':
        {
          const leafType = typeof currentElement as TDataType;
          const leafPath = addPath(parentPath, key.toString());
          const parentTreeChildren = parentTree.children ?? (parentTree.children = {});

          parentTreeChildren[key.toString()] = {
            level,
            type: leafType,
            path: leafPath,
            key: key.toString(),
            uniqueId: uniqueId(),
            childrenLength: 0,
            parentType: parentTree.type,
          };
          // update children length
          parentTree.childrenLength = keys(parentTreeChildren).length;
        }
        break;
      case 'object':
        {
          if (currentElement !== null) {
            const containerPath = addPath(parentPath, key.toString());
            // array or object
            const type = (
              Array.isArray(currentElement) ? 'array' : typeof currentElement
            ) as TDataType;
            const parentTreeChildren = parentTree.children ?? (parentTree.children = {});
            parentTreeChildren[key.toString()] = {
              path: containerPath,
              type,
              level,
              key: key.toString(),
              uniqueId: uniqueId(),
              childrenLength: 0,
              parentType: parentTree.type,
            };
            // update children length
            parentTree.childrenLength = keys(parentTreeChildren).length;

            // loop
            treeTraverser(
              currentElement /* object | array  */,
              addPath(parentPath, key.toString()),
              level + 1,
              parentTreeChildren[key.toString()],
            );
          } else {
            const leafType = 'null';
            const leafPath = addPath(parentPath, key.toString());
            // null
            const parentTreeChildren = parentTree.children ?? (parentTree.children = {});

            // add leafs
            parentTreeChildren[key.toString()] = {
              level,
              type: leafType,
              path: leafPath,
              key: key.toString(),
              uniqueId: uniqueId(),
              childrenLength: 0,
              parentType: parentTree.type,
            };
            // update children length
            parentTree.childrenLength = keys(parentTreeChildren).length;
          }
        }
        break;
      default:
        {
          console.warn('Unknown type will be removed', typeof currentElement, currentElement);

          // delete invalid content
          if (parentTree.type === 'object') {
            delete parentNode[key];
          }
          if (parentTree.type === 'array') {
            const list = parentNode as any[];
            const index = parseInt(key);
            list.splice(index, 1);
          }
        }
        break;
    }
  });
}

/**
 * Generates data for `JSONRenderer`
 * @param data Data object
 * @returns object with definitions for `JSONRenderer`
 */
export function buildTree<T = any>(data: T): TBuildTreeData<T> {
  console.info('buildTree', data);
  const tree: TTree = {};

  if (typeof data !== 'object' || data === null) {
    throw new TypeError('JSONRenderer supports only object or array as a type of data.');
  }

  const body = cloneDeep(data);
  // wrap it with internal root node
  const wrapper = {
    root: body, // body can be anything, wrap it with an object with `root` field.
  };
  // init tree
  tree.root = {
    path: 'root',
    type: Array.isArray(wrapper.root) ? 'array' : 'object',
    level: 0,
    key: 'root',
    uniqueId: uniqueId(),
    childrenLength: 0,
    parentType: null,
  };

  // start traversing
  treeTraverser(wrapper.root, 'root', 1, tree.root);

  return {
    tree,
    wrapper,
    changeIdentifier: uniqueId(),
  };
}

/**
 * Returns default empty value by type
 * @param type The data type to get the default value for
 * @returns Default value
 */
export const defaultValueByType = (type: TDataType): any => {
  switch (type) {
    case 'object':
      return {};
    case 'array':
      return [];
    case 'boolean':
      return false;
    case 'number':
      return 0;
    case 'null':
      return null;
    case 'string': // fall-through
    default:
      return '';
  }
};

export const isCollection = (collection: TTreeDescription): boolean => {
  return !!((collection.type === 'array' || collection.type === 'object') && collection.children);
};

export const fixArrayIndexes = (
  collection: TTreeDescription,
  oldPath: string,
  newPath: string,
): void => {
  if (isCollection(collection)) {
    keys(collection.children).forEach((key) => {
      const element = (collection.children as { [key: string | number]: TTreeDescription })[key];
      element.path = element.path.replace(oldPath, newPath);
      element.uniqueId = uniqueId();
      if (isCollection(element)) {
        fixArrayIndexes(element, oldPath, newPath);
      }
    });
  }
};
