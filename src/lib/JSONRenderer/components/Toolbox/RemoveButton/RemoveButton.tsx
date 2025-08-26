import { FC, useCallback } from 'react';
import { classnames } from '~/lib/JSONRenderer/utils/classnames';
import { Button } from '../../Button';
import SVGIcon from '../../SVGIcon/SVGIcon';
import { IToolbarButtonProps } from '../types';

const RemoveButton: FC<Omit<IToolbarButtonProps, 'onClick' | 'icon'>> = ({
  title,
  className,
  type,
  item,
}): JSX.Element => {
  const handleRemove = useCallback(() => {
    item?.delete();
  }, [item]);

  return (
    <Button
      className={classnames('RemoveButton', 'negative', className)}
      type={type || 'button'}
      onClick={handleRemove}
      title={title || 'Remove element'}
      icon={<SVGIcon icon='remove' />}
    />
  );
};

export default RemoveButton;
