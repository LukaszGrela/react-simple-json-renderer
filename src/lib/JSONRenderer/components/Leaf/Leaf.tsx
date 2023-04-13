import { FC } from 'react';
import { classnames } from '../../utils/classnames';
import { Value } from '../Value';
import { IProps } from './types';

const Leaf: FC<IProps> = ({ treeDescriptor, value }): JSX.Element => {
  return (
    <div
      className={classnames(
        'Element',
        'Leaf',
        'view',
        treeDescriptor.type,
        !!treeDescriptor.level && `level-${treeDescriptor.level}`,
      )}
    >
      <span className='Label' title={treeDescriptor.key}>
        {treeDescriptor.key}
      </span>
      <Value editable={false} dataType={treeDescriptor.type} value={value} />
    </div>
  );
};

export default Leaf;
