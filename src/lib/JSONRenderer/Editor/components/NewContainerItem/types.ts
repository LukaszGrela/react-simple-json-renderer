import { Observable } from '@legendapp/state';
import { TElement } from '~/lib/JSONRenderer/types';
import { TJSONArray, TJSONObject } from '~/lib/types';

export interface IProps extends TElement {
  containerId?: string;
  containerNode: Observable<TJSONArray | TJSONObject>;
}
