import React, { useCallback, useLayoutEffect, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { classnames } from '~/lib/JSONRenderer/utils/classnames';
import unescapeObjectsFieldName from '~/lib/JSONRenderer/utils/object/unescapeObjectsFieldName';
import { Button } from '../../Button';
import { SVGIcon } from '../../SVGIcon';
import { IToolbarButtonProps } from '../types';

const CopyButton: React.FC<Omit<IToolbarButtonProps, 'onClick' | 'icon' | 'type'>> = ({
  title,
  className,
  item,
}): JSX.Element => {
  const [copied, setCopied] = useState<true | false | null>(null);

  const data = item?.peek();
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
      }, 2500);
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
        <SwitchTransition mode={'out-in'}>
          <CSSTransition
            timeout={350}
            classNames='bounce'
            key={copied === true ? 'success' : copied === false ? 'failure' : 'copy'}
          >
            {copied === null ? (
              <SVGIcon icon='copy' />
            ) : copied === true ? (
              <SVGIcon icon={'success'} />
            ) : (
              <SVGIcon icon={'failure'} />
            )}
          </CSSTransition>
        </SwitchTransition>
      }
    />
  );
};

export default CopyButton;
