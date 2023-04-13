import { IButtonProps } from '../Button';
import { TTreeDescription } from '../../context/types';

export interface IToolbarButtonProps extends IButtonProps {
  treeDescriptor: TTreeDescription;
}
