import type { TDataType } from '../../../types';

export interface IProps {
  type: TDataType;
  id?: string;
  onChange: (type: TDataType) => void;
  hidden?: boolean;
  styles?: {
    typeSelect: any;
    select: any;
  };
}
