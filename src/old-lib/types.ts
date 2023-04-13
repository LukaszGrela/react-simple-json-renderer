export type TDataType = 'string' | 'object' | 'array' | 'boolean' | 'number' | 'null';

/**
 * Type Guard that assures the array is defined (not undefined or null) and has content (length > 0)
 * @param array Any array type
 */
export const arrayHasContent = <T>(array: unknown): array is T[] => {
  return Array.isArray(array) && array.length > 0;
};
