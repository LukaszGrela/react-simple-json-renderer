import { IButtonProps } from '../Button';
import { TTreeDescription } from '../../context/types';
import { Observable } from '@legendapp/state';
import { TJSONValue } from '~/lib/types';

export interface IToolbarButtonProps extends IButtonProps {
  treeDescriptor?: TTreeDescription;
  item: Observable<TJSONValue>;
}
