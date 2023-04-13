import React, { useCallback } from 'react';
import { TDataType } from '../../../types';
import type { IProps } from './types';

const TypeSelector: React.FC<IProps> = ({ hidden, styles, onChange, type, id = '' }) => {
  const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> = useCallback(
    (event) => {
      //
      onChange(event.target.value as TDataType);
    },
    [onChange],
  );
  const identifier = `${id}${id && '-'}type-selector`;
  return (
    <div hidden={hidden} className='TypeSelector'>
      <label htmlFor={identifier} hidden>
        Select type:
      </label>
      <select value={type} id={identifier} style={styles?.select} onChange={handleOnChange}>
        <option value='string'>{'"abc"'}</option>
        <option value='object'>{'{ }'}</option>
        <option value='array'>[ ]</option>
        <option value='boolean'>T/F</option>
        <option value='number'>0-9</option>
        <option value='null'>null</option>
      </select>
    </div>
  );
};

export default TypeSelector;
