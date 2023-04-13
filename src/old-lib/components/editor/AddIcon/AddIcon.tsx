import React from 'react';
import type { IProps } from './types';

const AddIcon: React.FC<IProps> = ({
  addElement,
  addTo,
  styles,
  hidden = false,
  type = 'text',
}: IProps) => {
  return (
    <span
      role='button'
      tabIndex={-1}
      hidden={hidden}
      title='add item'
      onClick={() => addElement(addTo, type)}
    >
      <span style={styles?.addButton}>&#43;</span>
    </span>
  );
};

AddIcon.displayName = 'AddIcon';

export default AddIcon;
