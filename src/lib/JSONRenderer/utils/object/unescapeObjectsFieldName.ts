import { unescapeFieldName } from '../fieldName';
import traverse from './traverse';

const unescapeObjectsFieldName = (data: unknown): unknown => {
  const walker = (chunk: unknown): unknown => {
    if (chunk && typeof chunk === 'object' && chunk !== null && !Array.isArray(chunk)) {
      // already processed
      return Object.keys(chunk).reduce((o, key) => {
        const fieldName = unescapeFieldName(key);
        return { ...o, [fieldName]: (chunk as any)[key] };
      }, {});
    }

    return chunk;
  };

  return traverse(data, walker);
};

export default unescapeObjectsFieldName;
