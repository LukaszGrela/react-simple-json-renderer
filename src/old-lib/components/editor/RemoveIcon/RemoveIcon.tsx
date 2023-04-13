import React from 'react';
import type { IProps } from './types';

const RemoveIcon: React.FC<IProps> = ({
  removeElement,
  removeFrom,
  removeKey,
  styles,
  hidden = false,
}) => {
  return (
    <span
      role='button'
      tabIndex={-1}
      hidden={hidden}
      title='remove item'
      onClick={() => removeElement(removeFrom, removeKey)}
    >
      <span style={styles?.removeButton}>&#215;</span>
    </span>
  );
};

export default RemoveIcon;
