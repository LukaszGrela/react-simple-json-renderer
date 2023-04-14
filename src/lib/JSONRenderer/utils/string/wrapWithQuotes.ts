import { TDataType } from '~/lib/types';

export const wrapWithQuotes = (value: string, type: TDataType, useQuotes = false): string => {
  if (useQuotes && type === 'string') {
    return `"${value}"`;
  }
  return value;
};
