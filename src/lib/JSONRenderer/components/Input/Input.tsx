import get from 'lodash/get';
import { FC, useCallback, useState } from 'react';
import { classnames } from '../../utils/classnames';
import { useJSONRendererContextActions } from '../../context';
import { Value } from '../Value';
import { IProps } from './types';
import { Toolbox } from '../Toolbox';
import { Label } from '../Label';
import { RemoveButton } from '../Toolbox/RemoveButton';
import { Button } from '../Button';

const Input: FC<IProps<any>> = ({ dataPathRef, treeDescriptor }) => {
  const { updateNode } = useJSONRendererContextActions();
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

  return (
    <div
      className={classnames(
        'Element',
        'Leaf',
        'Input',
        treeDescriptor.type,
        !!treeDescriptor.level && `level-${treeDescriptor.level}`,
      )}
    >
      <Label treeDescriptor={treeDescriptor} />
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
          onClick={console.log}
          title={'Edit element'}
          icon={<>✎</>}
        />
      </Toolbox>
    </div>
  );
};

export default Input;
