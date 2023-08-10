import { TJSONArray, TJSONObject, TJSONValue, guardIsPrimitiveValue } from '../../../types';
import { keys } from './keys';

type TNonParseable =
  | bigint
  // eslint-disable-next-line @typescript-eslint/ban-types
  | Function
  | symbol
  | undefined;
function isNonParseable(test: unknown): test is TNonParseable {
  switch (typeof test) {
    case 'undefined':
    case 'bigint':
    case 'function':
    case 'symbol': {
      return true;
    }
    default:
      return false;
  }
}

function identity<In = unknown, Out = unknown>(input: In): Out {
  return input as unknown as Out;
}

export type TTraverseCallback = <In = unknown, Out = unknown>(
  item: In,
  parentKey?: string,
  depth?: number,
  nonParseable?: boolean,
) => Out | null | undefined;

function traverse<Out extends TJSONValue, In = any>(
  j: In,
  callback: TTraverseCallback = identity,
): Out | null {
  type TTree = WeakMap<object, TTreeEntry>;
  type TTreeEntry = {
    parent: TTreeEntry | null;
    root: boolean;
    children: TTree;
    parentKey: string;
  };
  /**
   * Tree to keep structure reference for circular reference backtracking.
   */
  const tree: TTree = new WeakMap();
  /**
   * Build tree structure (only objects are tracked)
   * @param j An object to add as tree child
   * @param parentKey field name of `j` in parent object
   * @param depth iteration depth
   * @param parentNode parent object
   * @param subtree tree describing parent object
   */
  const addToTree = (
    j: In,
    parentKey: string,
    depth: number,
    parentNode: In | null = null,
    subtree: TTree,
  ) => {
    if (!guardIsPrimitiveValue(j) && j !== undefined) {
      if (parentKey === '' && depth === 0) {
        subtree.set(j as object, {
          parent: null,
          root: true,
          children: new WeakMap(),
          parentKey: '',
        });
      } else if (parentNode) {
        const entry = subtree.get(parentNode);
        if (entry && subtree) {
          entry.children.set(j as object, {
            parent: entry,
            root: false,
            children: new WeakMap(),
            parentKey,
          });
        }
      }
    }
  };

  /**
   * Check if given object is creating circular reference
   * @param item object to test
   * @param itemName object's field name
   * @param subtree tree structure to start backtracking
   * @param parentNode parent object
   * @returns `true` if `item\ object was found on the way to top of the tree
   */
  const isCircular = (
    item: unknown,
    itemName: string,
    subtree?: TTree,
    parentNode: In | null = null,
  ): boolean => {
    let result = false;
    if (!guardIsPrimitiveValue(item) && subtree) {
      //
      let parentEntry: TTreeEntry | null | undefined = subtree.get(parentNode as object);
      let path = `${itemName}>`;
      while (parentEntry) {
        if (!result) {
          result = !!parentEntry.parent?.children.has(item as object);
          path = `${parentEntry.parentKey}.${path}`;

          // close wrapping
          if (result) {
            path = `<${path}`;
          }
        } else if (parentEntry.parentKey) {
          // go to the root
          path = `${parentEntry.parentKey}.${path}`;
        }

        parentEntry = parentEntry.parent;
      }

      if (result) {
        console.warn(
          `Circular reference error at '${itemName}', entry will be removed\n`,
          `Path: ${path}\n`,
          'The <,> denotes the path closing the cirle.',
        );
      }
    }
    return result;
  };

  /**
   * Visits the given element performing some tests first:
   * - if it is a parseable to JSON element
   * - if given element creates circular reference - returns undefined
   * - if given element is primitive value
   * - if it is an array - iterate over elements invoking `innerTraverse` on each
   * - if it is an object - iterate over keys of an object invoking `innerTraverse` on each data
   * @param j
   * @param parentKey
   * @param depth
   * @param parentNode
   * @param parentTree
   * @returns
   */
  function innerTraverse(
    j: In | null,
    parentKey: string,
    depth: number,
    parentNode: In | null = null,
    parentTree: TTree,
  ): Out | null | undefined {
    if (isNonParseable(j)) {
      const value = callback<In, Out>(j, parentKey, depth, true);
      if (isNonParseable(value)) {
        console.warn(
          'Non parseable to JSON content will be removed',
          'key:',
          parentKey,
          'typeof',
          typeof j,
          'value',
          j,
        );

        // delete invalid content
        return undefined;
      }
      // If user decided to replace it with parseable data
      return value;
    }

    if (isCircular(j, parentKey, parentTree, parentNode)) {
      return undefined;
    }

    if (guardIsPrimitiveValue(j)) {
      return callback(j, parentKey, depth);
    } else if (Array.isArray(j)) {
      addToTree(j, parentKey, depth, parentNode, parentTree);
      const currentItemTree = (parentNode && parentTree?.get(parentNode)?.children) || tree;

      const copy = [];
      for (let index = 0; index < j.length; index++) {
        const element = j[index] as In;
        copy.push(
          innerTraverse(
            element === undefined ? null : element,
            `${index}`,
            depth + 1,
            j,
            currentItemTree,
          ),
        );
      }

      return callback<In, Out>(copy.filter((u) => u !== undefined) as In, parentKey, depth);
    } else {
      addToTree(j, parentKey, depth, parentNode, parentTree);
      const currentItemTree = (parentNode && parentTree?.get(parentNode)?.children) || tree;
      const k = keys(j);
      const object = k.reduce((acc, key) => {
        const data = j[key] as In;

        const value = innerTraverse(data, String(key), depth + 1, j, currentItemTree);
        if (value === undefined) {
          return acc;
        }
        return {
          ...acc,
          [key]: value,
        };
      }, {} as In);

      return callback(object, parentKey, depth);
    }
  }

  // start
  const output = innerTraverse(j, '', 0, null, tree);

  if (output == null) {
    return null;
  }

  return output;
}

export function copyObject<Out extends TJSONArray | TJSONObject, In = unknown>(
  o: In,
  callback?: TTraverseCallback,
): Out | null {
  const c = callback || identity;

  return traverse(o, c);
}

export default traverse;
