import React, { useCallback } from 'react';
import { IProps } from './types';

const defaultStyle = {
  collapseIcon: {
    cursor: 'pointer',
  },
};

const CollapseIcon: React.FC<IProps> = ({
  collapsible,
  toggleNodeCollapsed,
  isNodeCollapsed,
  styles = defaultStyle,
}) => {
  const handleClick = useCallback(() => {
    toggleNodeCollapsed();
  }, [toggleNodeCollapsed]);

  if (!collapsible) return null;
  return isNodeCollapsed() ? (
    <span role='button' tabIndex={-1} onClick={handleClick} style={styles.collapseIcon}>
      &#9658;
    </span>
  ) : (
    <span role='button' tabIndex={-1} onClick={handleClick} style={styles.collapseIcon}>
      &#9660;
    </span>
  );
};

export { CollapseIcon };
