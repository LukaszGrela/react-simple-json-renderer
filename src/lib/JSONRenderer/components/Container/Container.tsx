import { FC, useRef, useState, forwardRef, useCallback } from 'react';
import { classnames } from '../../utils/classnames';
import { useJSONRendererContextActions, useJSONRendererContextConfig } from '../../context';
import { useResizeObserver } from '../../utils/useResizeObserver';
import { IProps, IWrapperProps } from './types';
import { Button } from '../Button';
import { Toolbox } from '../Toolbox';
import { TypeSelector } from '../TypeSelector';
import { TDataType } from '~/lib/types';

const Container: FC<IProps> = ({ type, treeDescriptor, children }): JSX.Element => {
  const [narrow, setNarrow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const callback = (entries: ResizeObserverEntry[]) => {
    const div = entries[0];
    setNarrow(div?.contentRect.width <= 320);
  };
  useResizeObserver(ref, callback);

  const [selectedType, setSelectedType] = useState<TDataType>('string');

  const title = `Add New ${treeDescriptor.type === 'array' ? 'Item' : 'Field'}`;

  const { addNode } = useJSONRendererContextActions();

  const handleNewItem = useCallback(() => {
    console.log('Add to:', treeDescriptor, selectedType);
    addNode(treeDescriptor, selectedType, 'field');
  }, [addNode, treeDescriptor, selectedType]);

  const handleTypeChanged = useCallback((type: TDataType) => {
    setSelectedType(type);
  }, []);
  return (
    <ContainerWrapper
      ref={ref}
      className={narrow && 'narrow'}
      type={type}
      treeDescriptor={treeDescriptor}
      toolbox={
        treeDescriptor.children && (
          <Toolbox>
            <TypeSelector
              id={treeDescriptor.path}
              type={selectedType}
              onChange={handleTypeChanged}
            />
            <Button
              className='positive'
              type='button'
              onClick={handleNewItem}
              title={title}
              icon={<>&#43;</>}
            />
          </Toolbox>
        )
      }
    >
      {children}
    </ContainerWrapper>
  );
};

export const ContainerWrapper = forwardRef<HTMLDivElement, IWrapperProps>(
  ({ type, treeDescriptor, children, className, toolbox }, ref): JSX.Element => {
    const { collapsible } = useJSONRendererContextConfig();
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div
        ref={ref}
        className={classnames(
          'Element',
          'Container',
          type,
          `level-${treeDescriptor.level}`,
          className,
        )}
      >
        <span className={classnames('Label', !!toolbox && 'with-toolbox')}>
          {collapsible && treeDescriptor.children !== undefined && (
            <Button
              className='collapse'
              type='button'
              onClick={() => {
                setCollapsed((state) => !state);
              }}
              title='Collapse item'
              icon={<>&#9660;</>}
            />
          )}
          {treeDescriptor.key}
          {toolbox}
        </span>
        {children && !collapsed && <span className='Children'>{children}</span>}
      </div>
    );
  },
);
ContainerWrapper.displayName = 'ContainerWrapper';

export default Container;
