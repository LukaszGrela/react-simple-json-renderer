import { FC } from 'react';
import {
  TElement,
  TForItem,
  guardArrayObservable,
  guardObjectObservable,
  guardPrimitiveObservable,
} from '../../types';
import { TJSONValue } from '../../../types';
import { EBuiltInKeys } from '../../context';
import { classnames } from '../../utils/classnames';
import { Container } from './Container';

const InputLeaf: FC<any> = () => <>@TODO: Implement input leaf</>;

type TProps = TElement & TForItem<TJSONValue>;
export const Element: FC<TProps> = ({
  item,
  className,
  level = 0,
  id = EBuiltInKeys.ROOT,
  parentName = EBuiltInKeys.ROOT,
  parentType,
  path = '',
}: TProps) => {
  if (guardPrimitiveObservable(item)) {
    // return leaf node
    return (
      <InputLeaf
        className='Element'
        item={item}
        id={id}
        parentName={parentName}
        level={level}
        parentType={parentType}
        path={path}
      />
    );
  } else if (guardObjectObservable(item) || guardArrayObservable(item)) {
    // return container
    return (
      <Container
        className={classnames(className, 'Element')}
        id={id}
        item={item}
        level={level}
        parentName={parentName}
        parentType={parentType}
        path={path}
        ForItemComponent={Element as FC<TElement & Omit<TForItem<TJSONValue>, 'item'>>}
      />
    );
  }
  // never
  return null;
};
