import { ChangeEvent, useCallback } from 'react';
import { TDataType } from '../../../types';

type TEditableProps = {
  editable: true;
  onChange: <T = any>(newValue: T) => void;
  dataPath: string;
};
type TNonEditableProps = {
  editable: false;
};

export type TValue<T = any> = {
  dataType: TDataType;
  value: T;
};
export type TProps<T = any> = (TEditableProps | TNonEditableProps) & TValue<T>;

function EditableValue<T = any>({
  value,
  dataType,
  onChange,
  dataPath,
}: TEditableProps & TValue<T>): JSX.Element {
  const handleBooleanOnChange = useCallback(
    ({ target }: ChangeEvent<HTMLSelectElement>) => {
      onChange(target.value === 'true');
    },
    [onChange],
  );
  const handleOnChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      switch (true) {
        case dataType === 'number' && target.type === 'number':
          onChange(parseFloat(target.value));
          break;
        default:
          onChange(target.value);
          break;
      }
    },
    [dataType, onChange],
  );
  const fieldNameId = `field-${dataPath}`;
  switch (dataType) {
    case 'array':
      return <span className='Value Value-editable'>[ ]</span>;
    case 'object':
      return <span className='Value Value-editable'>{'{ }'}</span>;
    case 'null':
      return <span className='Value Value-editable'>null</span>;

    case 'boolean':
      return (
        <span className='Value Value-editable'>
          <label htmlFor={fieldNameId} hidden>
            Select value:
          </label>
          <select id={fieldNameId} value={`${value}`} onChange={handleBooleanOnChange}>
            <option value='true'>True</option>
            <option value='false'>False</option>
          </select>
        </span>
      );
    case 'string':
    case 'number':
    default:
      return (
        <span className='Value Value-editable'>
          <label htmlFor={fieldNameId} hidden>
            Edit value:
          </label>
          <input id={fieldNameId} type={dataType} value={value as any} onChange={handleOnChange} />
        </span>
      );
  }
}

const Value = <T,>(props: TProps<T>): JSX.Element => {
  const { value, editable, dataType } = props;
  if (editable)
    return (
      <EditableValue<T>
        value={value}
        dataType={dataType}
        dataPath={props.dataPath}
        editable
        onChange={(data) => {
          props.onChange(data);
        }}
      />
    );

  return <span className='Value'>{`${value}`}</span>;
};

export default Value;
