import { ReactNode } from 'react';
import { TClassNamesArg } from '../../utils/classnames';

export interface IProps {
  fieldName: string;
  className?: TClassNamesArg;
  children?: (escapedLabel: string, escapedLabelNode: ReactNode) => ReactNode;
}
