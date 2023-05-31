import { FC, useCallback, useState } from 'react';
import { classnames } from '../../utils/classnames';
import { IProps } from './types';
import { Value } from '../Value';
import { Toolbox } from '../Toolbox';
import { Label } from '../Label';
import { RemoveButton } from '../Toolbox/RemoveButton';
import { useJSONRendererContextActions, TUpdateDetails } from '../../context';
import { EditField } from '../EditField';
import { Button } from '../Button';
import SVGIcon from '../SVGIcon/SVGIcon';

const NullElement: FC<IProps<any>> = ({ treeDescriptor }): JSX.Element => {
  const { updateNode } = useJSONRendererContextActions();
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };
  const handleApplyEdit = useCallback(
    (update: TUpdateDetails): void => {
      setEditing(false);
      updateNode(treeDescriptor, update);
    },
    [treeDescriptor, updateNode],
  );

  return editing ? (
    <EditField
      className={classnames(
        'Element',
        'Leaf',
        'Input',
        treeDescriptor.type,
        !!treeDescriptor.level && `level-${treeDescriptor.level}`,
      )}
      descriptor={treeDescriptor}
      currentValue={null}
      apply={handleApplyEdit}
      cancel={handleCancelEdit}
    />
  ) : (
    <div
      className={classnames(
        'Element',
        'Leaf',
        'null',
        !!treeDescriptor.level && `level-${treeDescriptor.level}`,
      )}
    >
      <Label fieldName={treeDescriptor.key} />
      <Value editable={false} dataType='null' value={'null'} />
      <Toolbox>
        <RemoveButton treeDescriptor={treeDescriptor} />
        <Button
          className={'negative'}
          type={'button'}
          onClick={handleEdit}
          title={'Edit element'}
          icon={<SVGIcon icon='edit' />}
        />
      </Toolbox>
    </div>
  );
};

export default NullElement;
