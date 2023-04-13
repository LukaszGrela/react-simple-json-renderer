import { ReactNode } from 'react';
import { TClassNamesArg } from '../../utils/classnames';

export interface IProps {
  icon?: ReactNode;
  onClick: () => void;
  className?: TClassNamesArg;
  type?: string;
  title?: string;
}
