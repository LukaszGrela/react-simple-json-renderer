import get from 'lodash/get';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { EBuiltInKeys, TBuildTreeData, useSelector } from '~/lib/JSONRenderer/context';
import { classnames } from '~/lib/JSONRenderer/utils/classnames';
import unescapeObjectsFieldName from '~/lib/JSONRenderer/utils/object/unescapeObjectsFieldName';
import { Button } from '../../Button';
import { SVGIcon } from '../../SVGIcon';
import { IToolbarButtonProps } from '../types';

const CopyButton: React.FC<Omit<IToolbarButtonProps, 'onClick' | 'icon' | 'type'>> = ({
  treeDescriptor,
  title,
  className,
}): JSX.Element => {
  const selector = useCallback(
    (state: TBuildTreeData<any>[EBuiltInKeys.WRAPPER]): any => {
      const { path } = treeDescriptor;
      // container path
      const dataNode = get(state, path);

      return dataNode;
    },
    [treeDescriptor],
  );

  const [copied, setCopied] = useState<true | false | null>(null);

  const data = useSelector(selector);
  const onClick = useCallback(async () => {
    try {
      const output = JSON.stringify(unescapeObjectsFieldName(data));

      await navigator.clipboard.writeText(output);

      setCopied(true);
    } catch (error) {
      console.error(error);
      setCopied(false);
    }
  }, [data]);

  const cssClassName = classnames(
    'CopyButton',
    className,
    copied === true ? 'color positive' : copied === false ? 'color negative' : 'neutral',
  );

  useLayoutEffect(() => {
    let intervalId: ReturnType<typeof setTimeout>;
    if (copied !== null) {
      intervalId = setTimeout(() => {
        setCopied(null);
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearTimeout(intervalId);
      }
    };
  }, [copied]);

  return (
    <Button
      className={cssClassName}
      type='button'
      onClick={onClick}
      title={title || 'Copy'}
      disabled={copied !== null}
      icon={
        copied === null ? (
          <SVGIcon icon='copy' />
        ) : (
          <SVGIcon icon={copied === true ? 'success' : 'failure'} />
        )
      }
    />
  );
};

export default CopyButton;
