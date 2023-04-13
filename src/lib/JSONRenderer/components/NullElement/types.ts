import { IElement } from '../types';

export interface IProps<T> extends IElement<T> {
  unused?: unknown;
}
