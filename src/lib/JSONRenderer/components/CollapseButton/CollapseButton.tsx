import React from 'react';
import { Button } from '../Button';
import SVGIcon from '../SVGIcon/SVGIcon';
import { IProps } from './types';

export const CollapseButton: React.FC<IProps> = ({ onClick, collapsed }): JSX.Element => {
  const title = `${collapsed ? 'Expand' : 'Collapse'} item`;
  const toggleCollapse = React.useCallback(() => {
    onClick(!collapsed);
  }, [collapsed, onClick]);
  return (
    <Button
      className='collapse'
      type='button'
      onClick={toggleCollapse}
      title={title}
      icon={collapsed ? <SVGIcon icon='collapse' /> : <SVGIcon icon='expand' />}
    />
  );
};
