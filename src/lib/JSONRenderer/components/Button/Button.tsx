import { FC } from 'react';
import { IProps } from './types';
import { classnames } from '../../utils/classnames';

const Button: FC<IProps> = ({ className, icon, onClick, title }): JSX.Element => {
  return (
    <button
      className={classnames('Button', className)}
      type='button'
      onClick={onClick}
      title={title}
    >
      {icon}
    </button>
  );
};

export default Button;
