import { FC } from 'react';
import { IProps } from './types';
import { classnames } from '../../utils/classnames';

const Button: FC<IProps> = ({ className, icon, onClick, title, disabled }): JSX.Element => {
  return (
    <button
      className={classnames('Button', className, disabled && 'disabled')}
      type='button'
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export default Button;
