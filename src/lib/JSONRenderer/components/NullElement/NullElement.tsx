import { FC, useCallback } from 'react';
import { classnames } from '../../utils/classnames';
import { useJSONRendererContextActions } from '../../context';
import { IProps } from './types';
import { Value } from '../Value';
import { Toolbox } from '../Toolbox';
import { Button } from '../Button';
import { Label } from '../Label';

const NullElement: FC<IProps<any>> = ({ treeDescriptor }): JSX.Element => {
  const { removeNode } = useJSONRendererContextActions();

  const handleRemove = useCallback(() => {
    removeNode(treeDescriptor);
  }, [removeNode, treeDescriptor]);

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
        <Button
          className='negative'
          type='button'
          onClick={handleRemove}
          title='Remove element'
          icon={<>&#215;</>}
        />
      </Toolbox>
    </div>
  );
};

export default NullElement;
