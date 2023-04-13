import { ReactNode } from 'react';
import { TTreeDescription } from '../../context/types';
import { TClassNamesArg } from '../../utils/classnames';

export interface IProps {
  treeDescriptor: TTreeDescription;
  className?: TClassNamesArg;
  children?: (escapedLabel: string) => ReactNode;
}
