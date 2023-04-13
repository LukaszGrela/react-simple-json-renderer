import { FC, useCallback, useState } from 'react';
import { classnames } from '../../utils/classnames';
import { useJSONRendererContextActions } from '../../context';
import { IProps } from './types';
import { Button } from '../Button';
import { Toolbox } from '../Toolbox';
import { TypeSelector } from '../TypeSelector';
import { TDataType } from '~/lib/types';

const AddNewItem: FC<IProps> = ({ treeDescriptor }): JSX.Element => {
  const [selectedType, setSelectedType] = useState<TDataType>('string');
  const title = `Add New ${treeDescriptor.type === 'array' ? 'Item' : 'Field'}`;

  const { addNode } = useJSONRendererContextActions();

  const handleNewItem = useCallback(() => {
    console.log('Add to:', treeDescriptor, selectedType);
    addNode(treeDescriptor, selectedType, 'field');
  }, [addNode, treeDescriptor, selectedType]);

  const handleTypeChanged = useCallback((type: TDataType) => {
    setSelectedType(type);
  }, []);

  return (
    <div className={classnames('Element', 'Leaf', 'AddNewItem', `level-${treeDescriptor.level}`)}>
      <span className='Label'>{title}</span>
      <Toolbox>
        <TypeSelector id={treeDescriptor.path} type={selectedType} onChange={handleTypeChanged} />
        <Button
          className='positive'
          type='button'
          onClick={handleNewItem}
          title={title}
          icon={<>&#43;</>}
        />
      </Toolbox>
    </div>
  );
};

export default AddNewItem;
