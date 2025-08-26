import React, { ChangeEvent, useCallback, useState } from 'react';
import { IProps } from './types';
import { classnames } from '../../../utils/classnames';
import { Button, SVGIcon, Toolbox, TypeSelector } from '../../../components';
import { TDataType } from '~/lib';
import { defaultValueByType } from '../../../context';
import { guardArrayObservable } from '~/lib/JSONRenderer/types';
import { VisuallyHidden } from '~/lib/JSONRenderer/components/VisuallyHidden';

const NewContainerItem: React.FC<IProps> = ({
  containerNode,
  containerId,

  level,
  className,
}): JSX.Element => {
  const data = containerNode.get();
  const isArray = Array.isArray(data);
  const title = `Add New ${isArray ? 'Item' : 'Field'}`;

  const [error, setError] = useState('');
  const [fieldName, setFieldName] = useState('');
  const handleFieldOnChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setFieldName(target.value);
  }, []);

  const [selectedType, setSelectedType] = useState<TDataType>('string');
  const handleTypeChanged = useCallback((type: TDataType) => {
    setSelectedType(type);
  }, []);

  const [value /*, setValue */] = useState(defaultValueByType(selectedType));
  // const handleOnChange = useCallback((newValue: any) => {
  //   setValue(newValue);
  // }, []);

  const addNode = useCallback(() => {
    const newValue = selectedType === 'string' ? value : defaultValueByType(selectedType);
    if (guardArrayObservable(containerNode)) {
      containerNode.set((old) => [...old, newValue]);
    } else {
      const newKey = `key-${Math.random() * 1000}`;
      containerNode.set((old) => ({ ...old, [newKey]: newValue }));
    }
  }, [containerNode, selectedType, value]);

  const handleNewItem = useCallback(() => {
    const field = fieldName;
    if (!field && !isArray) {
      setError("Field name can't be empty.");
    } else {
      setError('');
      addNode();
    }
  }, [addNode, fieldName, isArray]);

  return (
    <div className={classnames(className, 'NewContainerItem', 'Leaf', !!level && `level-${level}`)}>
      <VisuallyHidden>
        <span className='Label'>{title}</span>
      </VisuallyHidden>

      {!isArray && (
        <span className={classnames('Value', 'Value-editable', !!error && 'invalid')}>
          <>
            <label htmlFor={`${containerId}-new-item-field-name`}>Field name:</label>
            <input
              // ref={firstFocusedItemRef}
              id={`${containerId}-new-item-field-name`}
              placeholder='Add field name'
              type={'text'}
              value={fieldName}
              onChange={handleFieldOnChange}
              aria-invalid={!!error}
              aria-describedby={`${containerId}-new-item-error-message`}
            />
            {!!error && (
              <span className='error-message' id={`${containerId}-new-item-error-message`}>
                {error}
              </span>
            )}
          </>
        </span>
      )}
      {isArray && <span className='Label'>0:</span>}
      <span className='Value'>{value}</span>

      <Toolbox>
        <TypeSelector
          id={`${containerId}-new-item-type-selector`}
          type={selectedType}
          onChange={handleTypeChanged}
        />
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

export default NewContainerItem;
