import lodashKeys from 'lodash/keys';

/**
 * Wrapper around `Object.keys` with built in non nullish check
 */
function keys<O, R extends (keyof O)[]>(object?: O): R {
  return lodashKeys(object) as R;
}

type TPrimitive = null | string | number | boolean;
function isPrimitive(test: unknown): test is TPrimitive {
  return (
    typeof test === 'string' ||
    typeof test === 'number' ||
    typeof test === 'boolean' ||
    test === null
  );
}

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

function identity<T = unknown>(input: T): T {
  return input;
}

export type TTraverseCallback = <T = unknown>(
  item: T,
  parentKey?: string,
  depth?: number,
  parseable?: boolean,
) => T | undefined;

function traverse<In>(j: In, callback: TTraverseCallback = identity): In | null | undefined {
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
    if (!isPrimitive(j) && j !== undefined) {
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
    if (!isPrimitive(item) && subtree) {
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
  ): In | null | undefined {
    if (isNonParseable(j)) {
      console.warn(
        'Non parseable to JSON content will be removed',
        'key:',
        parentKey,
        'typeof',
        typeof j,
        'value',
        j,
      );
      callback(j, parentKey, depth, true);
      // delete invalid content
      return undefined;
    }

    if (isCircular(j, parentKey, parentTree, parentNode)) {
      return undefined;
    }

    if (isPrimitive(j)) {
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

      return callback(
        copy.filter((u) => u !== undefined),
        parentKey,
        depth,
      ) as In;
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
  return innerTraverse(j, '', 0, null, tree);
}

export function copyObject<T = unknown>(o: T, callback?: TTraverseCallback): T | null | undefined {
  const c = callback || identity;

  return traverse(o, c);
}

// console.log(
//   traverse(
//     { a: '1', 'b.c': { c: '3', d: ['4', '5'] }, e: false },
//     function walker(
//       chunk: unknown,
//       chunkKey: string | number,
//       ownerKey: string | number,
//       depth: number,
//     ) {
//       console.log(
//         depth === 0 && ownerKey === '' ? '<ROOT>' : ownerKey,
//         `${chunkKey}: ${chunk}`,
//         depth,
//       );

//       if (chunk && typeof chunk === 'object' && chunk !== null && !Array.isArray(chunk)) {
//         // already processed
//         return Object.keys(chunk).reduce((o, key) => {
//           const fieldName = key.replaceAll('.', '-');
//           return { ...o, [fieldName]: (chunk as any)[key] };
//         }, {});
//       }

//       return chunk;
//     },
//   ),
// );

export default traverse;
