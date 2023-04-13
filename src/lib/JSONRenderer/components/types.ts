import { TTreeDescription } from '../context/types';

export interface IElement<T> {
  dataPathRef: T;

  treeDescriptor: TTreeDescription;
}
