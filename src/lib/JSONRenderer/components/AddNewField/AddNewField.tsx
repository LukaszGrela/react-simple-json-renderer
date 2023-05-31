import { ChangeEvent, FC, useCallback, useState } from 'react';
import { TDataType } from '~/lib/types';
import { classnames } from '../../utils/classnames';
import { escapeFieldName } from '../../utils/fieldName';
import { defaultValueByType, useJSONRendererContextActions } from '../../context';
import { IProps } from './types';
import { Button } from '../Button';
import { Toolbox } from '../Toolbox';
import { TypeSelector } from '../TypeSelector';
import { Value } from '../Value';
import { IconConfirm, IconRemove } from '../icons';

const AddNewField: FC<IProps> = ({
  treeDescriptor,
  newType,
  cancel,
  initialFieldName = '',
  fieldNameEditable = true,
}): JSX.Element => {
  const [error, setError] = useState('');
  const [fieldName, setFieldName] = useState(initialFieldName);

  const [selectedType, setSelectedType] = useState<TDataType>(newType);

  const { addNode } = useJSONRendererContextActions();

  const [value, setValue] = useState(defaultValueByType(selectedType));
  const handleOnChange = useCallback((newValue: any) => {
    setValue(newValue);
  }, []);

  const handleNewItem = useCallback(() => {
    const field = escapeFieldName(fieldName);
    if (!field && treeDescriptor.type === 'object') {
      setError("Field name can't be empty.");
    } else {
      setError('');
      const newValue = selectedType !== 'array' && selectedType !== 'object' ? value : undefined;
      addNode(treeDescriptor, selectedType, field, newValue);
    }
  }, [fieldName, treeDescriptor, selectedType, addNode, value]);

  const handleTypeChanged = useCallback((type: TDataType) => {
    setSelectedType(type);
    setValue(type === 'string' ? '' : JSON.stringify(defaultValueByType(type)));
  }, []);

  const fieldNameId = `${treeDescriptor.path}-field-name`;
  const handleFieldNameOnChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setFieldName(target.value);
  }, []);

  return (
    <div className={classnames('Element', 'Leaf', 'AddNewField', `level-${treeDescriptor.level}`)}>
      <span
        className={classnames('Value', fieldNameEditable && 'Value-editable', !!error && 'invalid')}
      >
        {fieldNameEditable ? (
          <>
            <label htmlFor={fieldNameId} hidden>
              Add field name:
            </label>
            <input
              id={fieldNameId}
              placeholder='Add field name'
              type={'text'}
              value={fieldName}
              onChange={handleFieldNameOnChange}
              aria-invalid={!!error}
              aria-describedby={`${fieldNameId}-error-message`}
            />
            {!!error && (
              <span className='error-message' id={`${fieldNameId}-error-message`}>
                {error}
              </span>
            )}
          </>
        ) : (
          `${fieldName}`
        )}
      </span>
      :
      <Value
        editable
        dataPath={treeDescriptor.path}
        dataType={selectedType}
        value={value}
        onChange={handleOnChange}
      />
      <Toolbox>
        <TypeSelector id={treeDescriptor.path} type={selectedType} onChange={handleTypeChanged} />

        <Button
          className='positive'
          type='button'
          onClick={handleNewItem}
          title='Apply changes'
          icon={<IconConfirm />}
        />
        <Button
          className='negative'
          type='button'
          onClick={cancel}
          title='Cancel changes'
          icon={<IconRemove />}
        />
      </Toolbox>
    </div>
  );
};

export default AddNewField;
