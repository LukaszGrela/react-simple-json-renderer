export type TDataType = 'string' | 'object' | 'array' | 'boolean' | 'number' | 'null';

// JSON
type TJSONPrimitiveValue = null | boolean | number | string;
type TJSONArray = TJSONValue[];
type TJSONObject = { [key: string]: TJSONValue };
type TJSONValue = TJSONPrimitiveValue | TJSONArray | TJSONObject;

export const guardIsPrimitiveValue = (test: unknown): test is TJSONPrimitiveValue => {
  return !!(
    typeof test === 'string' ||
    typeof test === 'number' ||
    typeof test === 'boolean' ||
    test === null
  );
};
export type { TJSONPrimitiveValue, TJSONArray, TJSONObject, TJSONValue };
