import { IDictionary } from '../shared/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEnumNames = <E extends IDictionary>(e: E): Set<keyof typeof e> => {
  return new Set(
    Object.keys(e).filter(
      (k) => typeof e[k] === 'number' || e[k] === k || e[e[k]]?.toString() !== k,
    ),
  );
};
