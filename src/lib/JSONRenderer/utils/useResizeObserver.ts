import { useLayoutEffect } from 'react';

export const useResizeObserver = <T extends Element | null>(
  elementRef: React.MutableRefObject<T | null>,
  sizeCallback: ResizeObserverCallback,
) => {
  useLayoutEffect(() => {
    const observer = new ResizeObserver(sizeCallback);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [elementRef, sizeCallback]);
};
