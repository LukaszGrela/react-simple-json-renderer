import { FC } from 'react';
import { classnames } from '../../utils/classnames';
import { IProps } from './types';
import { Value } from '../Value';
import { Toolbox } from '../Toolbox';
import { Label } from '../Label';
import { RemoveButton } from '../Toolbox/RemoveButton';

const NullElement: FC<IProps<any>> = ({ treeDescriptor }): JSX.Element => {
  return (
    <div
      className={classnames(
        'Element',
        'Leaf',
        'null',
        !!treeDescriptor.level && `level-${treeDescriptor.level}`,
      )}
    >
      <Label treeDescriptor={treeDescriptor} />
      <Value editable={false} dataType='null' value={'null'} />
      <Toolbox>
        <RemoveButton treeDescriptor={treeDescriptor} />
      </Toolbox>
    </div>
  );
};

export default NullElement;
