import { TDataType } from '../../../types';

export interface IProps {
  addElement: (callback: () => void, type?: TDataType) => void;
  addTo: () => void;
  styles: { addButton?: any };

  hidden?: boolean;
  type?: TDataType;
}
