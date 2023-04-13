import get from 'lodash/get';
import { FC, useCallback, useState } from 'react';
import { classnames } from '../../utils/classnames';
import { useJSONRendererContextActions } from '../../context';
import { Value } from '../Value';
import { IProps } from './types';
import { Toolbox } from '../Toolbox';
import { Button } from '../Button';

const Input: FC<IProps<any>> = ({ dataPathRef, treeDescriptor }) => {
  const { removeNode, updateNode } = useJSONRendererContextActions();
  const [value, setValue] = useState(get(dataPathRef, treeDescriptor.path));
  const handleOnChange = useCallback(
    (newValue: any) => {
      setValue(newValue);
      updateNode(treeDescriptor);
    },
    [treeDescriptor, updateNode],
  );
  const handleRemove = useCallback(() => {
    removeNode(treeDescriptor);
  }, [removeNode, treeDescriptor]);

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
      <span className='Label' title={treeDescriptor.key}>
        {treeDescriptor.key}
      </span>
      <Value
        editable
        dataPath={treeDescriptor.path}
        dataType={treeDescriptor.type}
        value={value}
        onChange={handleOnChange}
      />
      <Toolbox>
        <Button
          className='negative'
          type='button'
          onClick={handleRemove}
          title='Remove element'
          icon={<>&#215;</>}
        />
        <Button
          className='positive'
          type='button'
          onClick={handleRemove}
          title='Apply changes'
          icon={<>&#10003;</>}
        />
        <Button type='button' onClick={handleRemove} title='Remove element' icon={<>&#43;</>} />
      </Toolbox>
    </div>
  );
};

export default Input;
