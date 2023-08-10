import { TDataType } from '~/lib/types';

export const wrapWithQuotes = (value: string, type: TDataType, useQuotes = false): string => {
  if (useQuotes && type === 'string') {
    const processedValue = value === '<NO NAME>' ? '' : value;
    return `"${processedValue}"`;
  }

  return value;
};
