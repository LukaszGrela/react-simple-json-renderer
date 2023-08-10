import { FC } from 'react';
import {
  TElement,
  TForItem,
  guardArrayObservable,
  guardObjectObservable,
  guardPrimitiveObservable,
} from '../../types';
import { EBuiltInKeys } from '../../context';
import { TJSONValue } from '../../../types';
import { Leaf } from './Leaf';
import { ViewerContainer } from './ViewerContainer';
import { classnames } from '../../utils/classnames';

type TProps = TElement & TForItem<TJSONValue>;
export const Element: FC<TProps> = ({
  item,
  className,
  level = 0,
  id = EBuiltInKeys.ROOT,
  parentName = EBuiltInKeys.ROOT,
}: TProps) => {
  // const peeked = item.peek();
  // const idLabel =
  //   typeof id === 'number' || (typeof id === 'string' && id !== '') ? `${id}` : '<EMPTY>';

  if (guardPrimitiveObservable(item)) {
    // return leaf node
    return <Leaf className='Element' item={item} id={id} parentName={parentName} />;
  } else if (guardObjectObservable(item) || guardArrayObservable(item)) {
    // return container
    return (
      <ViewerContainer
        className={classnames(className, 'Element')}
        id={id}
        item={item}
        level={level}
        parentName={parentName}
        ForItemComponent={Element as FC<TElement & Omit<TForItem<TJSONValue>, 'item'>>}
      />
    );
  }
  // never
  return null;
};
