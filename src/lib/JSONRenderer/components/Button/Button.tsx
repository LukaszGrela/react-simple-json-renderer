import { FC, ReactNode } from 'react';
import { classnames } from '../../utils/classnames';

interface IProps {
  icon?: ReactNode;
  onClick: () => void;
  className?: string;
  type?: string;
  title?: string;
}

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
