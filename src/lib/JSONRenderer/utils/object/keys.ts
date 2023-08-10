import lodashKeys from 'lodash/keys';

/**
 * Wrapper around `lodash/keys` with type
 */
export function keys<O, R extends (keyof O)[]>(object?: O): R {
  return lodashKeys(object) as R;
}
