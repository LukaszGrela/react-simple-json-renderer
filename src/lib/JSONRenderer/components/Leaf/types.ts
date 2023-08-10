import { TJSONPrimitiveValue, TDataType } from '~/lib/types';

export interface IProps {
  id?: string;
  level?: number;
  value: TJSONPrimitiveValue;
  parentType?: TDataType;
}
