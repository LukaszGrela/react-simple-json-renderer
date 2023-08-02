import { unescapeFieldName } from '../fieldName';
import traverse, { TTraverseCallback } from './traverse';

const unescapeObjectsFieldName = (data: unknown): unknown => {
  const walker: TTraverseCallback = <T = unknown>(chunk: T): T => {
    if (chunk && typeof chunk === 'object' && chunk !== null && !Array.isArray(chunk)) {
      // already processed
      return Object.keys(chunk).reduce((o, key) => {
        const fieldName = unescapeFieldName(key);
        return { ...o, [fieldName]: (chunk as any)[key] };
      }, {}) as T;
    }

    return chunk;
  };

  return traverse(data, walker);
};

export default unescapeObjectsFieldName;
