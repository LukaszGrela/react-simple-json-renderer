import get from 'lodash/get';
import { FC, useCallback, useState } from 'react';
import { classnames } from '../../utils/classnames';
import { TUpdateDetails, useJSONRendererContextActions } from '../../context';
import { Value } from '../Value';
import { IProps } from './types';
import { Toolbox } from '../Toolbox';
import { Label } from '../Label';
import { RemoveButton } from '../Toolbox/RemoveButton';
import { Button } from '../Button';
import { EditField } from '../EditField';

const Input: FC<IProps<any>> = ({ dataPathRef, treeDescriptor }) => {
  const { updateNode } = useJSONRendererContextActions();
  const [editing, setEditing] = useState(false);

  const [value, setValue] = useState(get(dataPathRef, treeDescriptor.path));
  const handleOnChange = useCallback(
    (newValue: any) => {
      setValue(newValue);
      updateNode(treeDescriptor, {
        value: newValue,
      });
    },
    [treeDescriptor, updateNode],
  );

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };
  const handleApplyEdit = (update: TUpdateDetails): void => {
    setEditing(false);
    if (value !== update.value) {
      setValue(update.value);
    }
    updateNode(treeDescriptor, update);
  };

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
      currentValue={value}
      apply={handleApplyEdit}
      cancel={handleCancelEdit}
    />
  ) : (
    <div
      className={classnames(
        'Element',
        'Leaf',
        'Input',
        treeDescriptor.type,
        !!treeDescriptor.level && `level-${treeDescriptor.level}`,
      )}
    >
      <Label fieldName={treeDescriptor.key} />
      <Value
        editable
        dataPath={treeDescriptor.path}
        dataType={treeDescriptor.type}
        value={value}
        onChange={handleOnChange}
      />
      <Toolbox>
        <RemoveButton treeDescriptor={treeDescriptor} />
        <Button
          className={'negative'}
          type={'button'}
          onClick={handleEdit}
          title={'Edit element'}
          icon={<>✎</>}
        />
      </Toolbox>
    </div>
  );
};

export default Input;
