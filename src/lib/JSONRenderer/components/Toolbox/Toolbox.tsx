import { FC, ReactNode } from 'react';

const Toolbox: FC<{ children?: ReactNode }> = ({ children }): JSX.Element => {
  return <div className='Toolbox'>{children}</div>;
};

export default Toolbox;
