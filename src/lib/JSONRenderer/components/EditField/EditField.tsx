import { ChangeEvent, FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { TDataType } from '~/lib/types';
import { defaultValueByType, TUpdateDetails } from '../../context';
import { classnames } from '../../utils/classnames';
import { escapeFieldName, unescapeFieldName } from '../../utils/fieldName';
import { setAutoFocus } from '../../utils/setAutoFocus';
import { Button } from '../Button';
import SVGIcon from '../SVGIcon/SVGIcon';
import { Toolbox } from '../Toolbox';
import { TypeSelector } from '../TypeSelector';
import { Value } from '../Value';
import { IProps } from './types';

const EditField: FC<IProps> = ({
  descriptor,
  currentValue,
  apply,
  cancel,
  className,
}): JSX.Element => {
  const fieldNameId = `${descriptor.path}-field-name`;
  const [error, setError] = useState('');
  const [fieldName, setFieldName] = useState(descriptor.key);
  const [selectedType, setSelectedType] = useState<TDataType>(descriptor.type);
  const [value, setValue] = useState(currentValue);

  const handleFieldNameOnChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setFieldName(target.value);
  }, []);
  const handleOnChange = useCallback((newValue: any) => {
    setValue(newValue);
  }, []);
  const handleTypeChanged = useCallback((type: TDataType) => {
    setSelectedType(type);
    setValue(type === 'string' ? '' : JSON.stringify(defaultValueByType(type)));
  }, []);

  const handleApplyChanges = useCallback(() => {
    const field = escapeFieldName(fieldName);
    if (!field && descriptor.parentType === 'object') {
      setError("Field name can't be empty.");
    } else {
      setError('');
      const newValue =
        selectedType !== 'array' && selectedType !== 'object'
          ? value
          : defaultValueByType(selectedType);
      const update: TUpdateDetails = {
        value: newValue,
        type: selectedType !== descriptor.type ? selectedType : undefined,
        key: field !== descriptor.key ? field : undefined,
      };
      apply(update);
    }
  }, [
    apply,
    descriptor.key,
    descriptor.parentType,
    descriptor.type,
    fieldName,
    selectedType,
    value,
  ]);
  const firstFocusedItemRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    setAutoFocus(firstFocusedItemRef.current);
  }, []);
  return (
    <div className={classnames(className, 'EditField')}>
      <span className={classnames('Value', 'Value-editable', !!error && 'invalid')}>
        {descriptor.parentType !== 'array' ? (
          <>
            <label htmlFor={fieldNameId} hidden>
              Change field name:
            </label>
            <input
              ref={firstFocusedItemRef}
              id={fieldNameId}
              placeholder='Change field name'
              type={'text'}
              value={unescapeFieldName(fieldName)}
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
          `${unescapeFieldName(fieldName)}`
        )}
      </span>
      :
      <Value
        focusable
        editable
        dataPath={descriptor.path}
        dataType={selectedType}
        value={value}
        onChange={handleOnChange}
      />
      <Toolbox>
        <TypeSelector id={descriptor.path} type={selectedType} onChange={handleTypeChanged} />

        <Button
          className='positive'
          type='button'
          onClick={handleApplyChanges}
          title='Apply changes'
          icon={<SVGIcon icon='confirm' />}
        />
        <Button
          className='negative'
          type='button'
          onClick={cancel}
          title='Cancel changes'
          icon={<SVGIcon icon='close' />}
        />
      </Toolbox>
    </div>
  );
};

export default EditField;
