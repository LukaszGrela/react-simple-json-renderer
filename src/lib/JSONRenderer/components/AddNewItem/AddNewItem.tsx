import { ChangeEvent, FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { classnames } from '../../utils/classnames';
import { escapeFieldName } from '../../utils/fieldName';
import { setAutoFocus } from '../../utils/setAutoFocus';
import { useJSONRendererContextActions } from '../../context';
import { IProps } from './types';
import { Button } from '../Button';
import { Toolbox } from '../Toolbox';
import { TypeSelector } from '../TypeSelector';
import { TDataType } from '~/lib/types';
import SVGIcon from '../SVGIcon/SVGIcon';

const AddNewItem: FC<IProps> = ({ treeDescriptor }): JSX.Element => {
  const [error, setError] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [selectedType, setSelectedType] = useState<TDataType>('string');
  const title = `Add New ${treeDescriptor.type === 'array' ? 'Item' : 'Field'}`;

  const { addNode } = useJSONRendererContextActions();

  const handleNewItem = useCallback(() => {
    const field = escapeFieldName(fieldName);
    if (!field && treeDescriptor.type === 'object') {
      setError("Field name can't be empty.");
    } else {
      setError('');
      addNode(treeDescriptor, selectedType, field);
    }
  }, [treeDescriptor, selectedType, addNode, fieldName]);

  const handleTypeChanged = useCallback((type: TDataType) => {
    setSelectedType(type);
  }, []);
  const fieldNameId = `${treeDescriptor.path}-field-name`;
  const handleOnChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setFieldName(target.value);
  }, []);

  const firstFocusedItemRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    setAutoFocus(firstFocusedItemRef.current);
  }, []);

  return (
    <div className={classnames('Element', 'Leaf', 'AddNewItem', `level-${treeDescriptor.level}`)}>
      <span className='Label'>{title}</span>
      {treeDescriptor.type === 'object' && (
        <span className={classnames('Value', 'Value-editable', !!error && 'invalid')}>
          <label htmlFor={fieldNameId} hidden>
            Add field name:
          </label>
          <input
            ref={firstFocusedItemRef}
            id={fieldNameId}
            placeholder='Add field name'
            type={'text'}
            value={fieldName}
            onChange={handleOnChange}
            aria-invalid={!!error}
            aria-describedby={`${fieldNameId}-error-message`}
          />
          {!!error && (
            <span className='error-message' id={`${fieldNameId}-error-message`}>
              {error}
            </span>
          )}
        </span>
      )}
      {treeDescriptor.type === 'array' && <span className='Value'>0</span>}
      <Toolbox>
        <TypeSelector id={treeDescriptor.path} type={selectedType} onChange={handleTypeChanged} />
        <Button
          className='positive'
          type='button'
          onClick={handleNewItem}
          title={title}
          icon={<SVGIcon icon='add' />}
        />
      </Toolbox>
    </div>
  );
};

export default AddNewItem;
