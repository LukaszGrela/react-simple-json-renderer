import type { TDataType } from '../../../types';

export interface IProps {
  type: TDataType;
  onChange: (type: TDataType) => void;
  hidden?: boolean;
  styles?: {
    typeSelect: any;
    select: any;
  };
}
