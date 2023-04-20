import { FC, useCallback } from 'react';
import { classnames } from '~/lib/JSONRenderer/utils/classnames';
import { useJSONRendererContextActions } from '../../../context';
import { Button } from '../../Button';
import { IToolbarButtonProps } from '../types';

const RemoveButton: FC<Omit<IToolbarButtonProps, 'onClick' | 'icon'>> = ({
  treeDescriptor,
  title,
  className,
  type,
}): JSX.Element => {
  const { removeNode } = useJSONRendererContextActions();

  const handleRemove = useCallback(() => {
    removeNode(treeDescriptor);
  }, [removeNode, treeDescriptor]);

  return (
    <Button
      className={classnames('RemoveButton', 'negative', className)}
      type={type || 'button'}
      onClick={handleRemove}
      title={title || 'Remove element'}
      icon={'×'}
    />
  );
};

export default RemoveButton;
