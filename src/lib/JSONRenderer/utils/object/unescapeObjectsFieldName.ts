import { unescapeFieldName } from '../fieldName';
import traverse, { TTraverseCallback } from './traverse';

const unescapeObjectsFieldName = (data: unknown): unknown => {
  const walker: TTraverseCallback = <T = unknown, R = unknown>(chunk: T): R => {
    if (chunk && typeof chunk === 'object' && chunk !== null && !Array.isArray(chunk)) {
      // already processed
      return Object.keys(chunk).reduce((o, key) => {
        const fieldName = unescapeFieldName(key);
        return { ...o, [fieldName]: (chunk as any)[key] };
      }, {}) as R;
    }

    return chunk as unknown as R;
  };

  return traverse(data, walker);
};

export default unescapeObjectsFieldName;
