import { FC, useState, useRef } from 'react';
import { classnames } from '../../utils/classnames';
import { useResizeObserver } from '../../utils/useResizeObserver';
import { IProps } from './types';

const SizeContainer: FC<IProps> = ({ children, className }): JSX.Element => {
  const [narrow, setNarrow] = useState<'narrow' | 'narrower' | false>(false);
  const ref = useRef<HTMLDivElement>(null);
  const callback = (entries: ResizeObserverEntry[]) => {
    const div = entries[0];

    setNarrow(() => {
      if (div?.contentRect.width > 640) {
        return false;
      }
      if (div?.contentRect.width > 520) {
        return 'narrow';
      }
      return 'narrower';
    });
  };
  useResizeObserver(ref, callback);

  return (
    <div ref={ref} className={classnames(className, 'SizeContainer', narrow)}>
      {children}
    </div>
  );
};

export default SizeContainer;
