import { FC, useState, forwardRef, useCallback } from 'react';
import { classnames } from '../../utils/classnames';
import { useJSONRendererContextConfig } from '../../context';
import { IProps, IWrapperProps } from './types';
import { Button } from '../Button';
import { Toolbox } from '../Toolbox';
import { TypeSelector } from '../TypeSelector';
import { TDataType } from '~/lib/types';
import { Label } from '../Label';
import { AddNewItem } from '../AddNewItem';
import { RemoveButton } from '../Toolbox/RemoveButton';
import { AddNewField } from '../AddNewField';
import { wrapWithQuotes } from '../../utils/string';

const Container: FC<IProps> = ({ type, treeDescriptor, children }): JSX.Element => {
  const { collapsible } = useJSONRendererContextConfig();
  const [isCollapsed, setCollapsed] = useState(false);

  const [inlineEditing, setInlineEditing] = useState(false);

  const [selectedType, setSelectedType] = useState<TDataType>('string');

  const title = `Add New ${treeDescriptor.type === 'array' ? 'Item' : 'Field'}`;

  const handleInlineEditing = useCallback(() => {
    setInlineEditing(true);
  }, []);

  const handleTypeChanged = useCallback((type: TDataType) => {
    setSelectedType(type);
  }, []);

  const handleCancelAddingNewField = useCallback(() => {
    setInlineEditing(false);
  }, []);

  const handleWrapperCollapsed = useCallback((collapsed: boolean): void => {
    setCollapsed(collapsed);
  }, []);

  return (
    <ContainerWrapper
      collapsible={collapsible}
      onCollapse={handleWrapperCollapsed}
      type={type}
      treeDescriptor={treeDescriptor}
      toolbox={
        <Toolbox>
          {!isCollapsed && treeDescriptor.children && (
            <>
              <TypeSelector
                id={treeDescriptor.path}
                type={selectedType}
                onChange={handleTypeChanged}
              />
              <Button
                className='positive'
                type='button'
                onClick={handleInlineEditing}
                title={title}
                icon={<>&#43;</>}
              />
            </>
          )}
          {!(treeDescriptor.key === 'root' && treeDescriptor.level === 0) && (
            <RemoveButton treeDescriptor={treeDescriptor} />
          )}
        </Toolbox>
      }
    >
      {children}
      {!treeDescriptor.children && (
        <AddNewItem treeDescriptor={{ ...treeDescriptor, level: treeDescriptor.level + 1 }} />
      )}
      {treeDescriptor.children && inlineEditing && (
        <AddNewField
          initialFieldName={
            treeDescriptor.type === 'array' ? treeDescriptor.childrenLength.toString() : undefined
          }
          fieldNameEditable={treeDescriptor.type === 'object'}
          newType={selectedType}
          treeDescriptor={{ ...treeDescriptor, level: treeDescriptor.level + 1 }}
          cancel={handleCancelAddingNewField}
        />
      )}
    </ContainerWrapper>
  );
};

export const ContainerWrapper = forwardRef<HTMLDivElement, IWrapperProps>(
  (
    {
      type,
      treeDescriptor,
      children,
      className,
      toolbox,
      onCollapse,
      collapsible,
      useQuotes,
      viewer,
    },
    ref,
  ): JSX.Element => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapse = useCallback(() => {
      setCollapsed((state) => !state);
      onCollapse?.(!collapsed);
    }, [collapsed, onCollapse]);

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
        <Label className={!!toolbox && 'with-toolbox'} fieldName={treeDescriptor.key}>
          {(escapedLabel) => (
            <>
              {collapsible && treeDescriptor.children !== undefined && (
                <Button
                  className='collapse'
                  type='button'
                  onClick={toggleCollapse}
                  title='Collapse item'
                  icon={!collapsed ? '▼' : '►'}
                />
              )}
              {
                <span className='wrapper'>{`${wrapWithQuotes(escapedLabel, 'string', useQuotes)}${
                  viewer ? ':' : ''
                }`}</span>
              }
              {collapsed && (
                <span className='brackets'>
                  {treeDescriptor.type === 'array' ? '[ … ]' : '{ … }'}
                </span>
              )}
              {toolbox}
            </>
          )}
        </Label>
        {children && !collapsed && <span className='Children'>{children}</span>}
      </div>
    );
  },
);
ContainerWrapper.displayName = 'ContainerWrapper';

export const ViewerContainer: FC<Omit<IWrapperProps, 'collapsible' | 'useQuotes'>> = (
  props,
): JSX.Element => {
  const { collapsible, viewerUseQuotes } = useJSONRendererContextConfig();

  return (
    <ContainerWrapper collapsible={collapsible} useQuotes={viewerUseQuotes} {...props} viewer />
  );
};
ViewerContainer.displayName = 'ViewerContainer';

export default Container;
