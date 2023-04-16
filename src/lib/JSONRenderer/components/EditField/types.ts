import { TTreeDescription, TUpdateDetails } from '../../context';
import { TClassNamesArg } from '../../utils/classnames';
export interface IProps {
  descriptor: TTreeDescription;
  currentValue: any;
  apply: (details: TUpdateDetails) => void;
  cancel: () => void;

  className?: TClassNamesArg;
}
