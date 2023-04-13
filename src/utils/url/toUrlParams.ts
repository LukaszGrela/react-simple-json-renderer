/* eslint-disable import/prefer-default-export */

/**
 * Converts the given object into a URL params string
 * ```JavaScript
 * const params = {
 *  storeId: 123,
 *  data: "This is a test"
 * }
 * console.log(toUrlParams(params));// storeId=123&data=This%20is%20a%20test
 * ```
 * When `addQueryCharacter` is set to `true` the `?` character will be added.
 * When `excludeUndefined` is set to `true` then entry with an `undefined` value will be excluded from output.
 * When `splitLists` is set to `true` then entry that is an array is split into separate entries (`{nodeIds:[1,2,3]}` will become nodesIds=1&nodesIds=2&nodesIds=3)
 */
export const toUrlParams = (
  params: { [key: string]: any },
  addQueryCharacter = false,
  excludeUndefined = false,
  splitLists = false,
): string => {
  const keys = Object.keys(params);
  const outputParams = keys.reduce((acc: string[], key) => {
    let entry: string[] = [`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`];

    if (splitLists && Array.isArray(params[key])) {
      entry.length = 0;
      // repeat for each value
      const list = params[key];
      entry = list.map(
        (value: any): string => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      );
    }
    if (excludeUndefined && params[key] === undefined) {
      entry.length = 0;
    }
    return [...acc, ...entry];
  }, []);
  return `${addQueryCharacter && outputParams.length > 0 ? '?' : ''}${outputParams.join('&')}`;
};
