import React, { useCallback } from 'react';
import { TDataType } from '../../../types';
import type { IProps } from './types';

const TypeSelector: React.FC<IProps> = ({ hidden, styles, onChange, type }) => {
  const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
    (event) => {
      //
      onChange(event.target.value as TDataType);
    },
    [onChange],
  );
  return (
    <div hidden={hidden} style={styles?.typeSelect}>
      <label htmlFor='type-selector' hidden>
        Select type:
      </label>
      <select
        value={type}
        name='type'
        id='type-selector'
        style={styles?.select}
        onChange={handleOnChange}
      >
        <option value='text'>{'"abc"'}</option>
        <option value='object'>{'{}'}</option>
        <option value='array'>[]</option>
        <option value='boolean'>T/F</option>
        <option value='number'>0-9</option>
        <option value='null'>null</option>
      </select>
    </div>
  );
};

export default TypeSelector;
