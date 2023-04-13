import React from 'react';
import type { IProps } from './types';

const SaveIcon: React.FC<IProps> = ({ saveElement, saveIn, saveKey, styles }) => {
  return (
    <span
      role='button'
      tabIndex={-1}
      title='save item'
      onClick={() => saveElement(saveIn, saveKey)}
    >
      <span style={styles?.saveButton}>&#10003;</span>
    </span>
  );
};

export default SaveIcon;
