import get from 'lodash/get';
import { FC, useCallback, useState } from 'react';
import { classnames } from '../../utils/classnames';
import { useJSONRendererContextActions } from '../../context';
import { Value } from '../Value';
import { IProps } from './types';
import { Toolbox } from '../Toolbox';
import { Button } from '../Button';
import { Label } from '../Label';
import { RemoveButton } from '../Toolbox/RemoveButton';

const Input: FC<IProps<any>> = ({ dataPathRef, treeDescriptor }) => {
  const { updateNode } = useJSONRendererContextActions();
  const [value, setValue] = useState(get(dataPathRef, treeDescriptor.path));
  const handleOnChange = useCallback(
    (newValue: any) => {
      setValue(newValue);
      updateNode(treeDescriptor);
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
          className='positive'
          type='button'
          onClick={() => {
            console.log('click');
          }}
          title='Apply changes'
          icon={<>&#10003;</>}
        />
        <Button
          type='button'
          onClick={() => {
            console.log('click');
          }}
          title='Remove element'
          icon={<>&#43;</>}
        />
      </Toolbox>
    </div>
  );
};

export default Input;
