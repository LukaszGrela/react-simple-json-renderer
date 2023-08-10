import { For, observer } from '@legendapp/state/react';
import { FC, useCallback, useState } from 'react';
import { TElement, TForItem, guardArrayObservable } from '../../types';
import { TDataType, TJSONArray, TJSONObject, TJSONValue } from '../../../types';
import { EBuiltInKeys, useJSONRendererContextConfig } from '../../context';
import { keys } from '../../utils/object/keys';
import { CollapseContainer } from '../../components/CollapseContainer';
import { classnames } from '../../utils/classnames';
import {
  Button,
  CopyButton,
  CollapseButton,
  Label,
  RemoveButton,
  SVGIcon,
  Toolbox,
  TypeSelector,
  AddNewItem,
  AddNewField,
} from '../../components';
import { wrapWithQuotes } from '../../utils/string';
import { unescapeFieldName } from '../../utils/fieldName';

type TProps = TElement &
  TForItem<TJSONArray | TJSONObject> & {
    ForItemComponent: FC<TElement & Omit<TForItem<TJSONValue>, 'item'>>;
  };
export const Container: FC<TProps> = observer(
  ({ id, className, level = 0, item, parentName, parentType, ForItemComponent, path = '' }) => {
    const config = useJSONRendererContextConfig();
    const collapsible = config.collapsible.get();
    const hideRootName = config.hideRootName.get();
    const viewerUseQuotes = config.viewerUseQuotes.get();

    const idLabel =
      typeof id === 'number' || (typeof id === 'string' && id !== '') ? `${id}` : '<NO NAME>';

    const fieldNameId = `${path}${path ? '.' : ''}${idLabel}`;
    const isArray = guardArrayObservable(item);
    const title = `Add New ${isArray ? 'Item' : 'Field'}`;
    const hasChildren = isArray ? item.length > 0 : keys(item.peek()).length > 0;

    const [selectedType, setSelectedType] = useState<TDataType>('string');
    const handleTypeChanged = useCallback((type: TDataType) => {
      setSelectedType(type);
    }, []);

    const [inlineEditing, setInlineEditing] = useState(false);
    const handleInlineEditing = useCallback(() => {
      setInlineEditing(true);
    }, []);
    const handleCancelAddingNewField = useCallback(() => {
      setInlineEditing(false);
    }, []);

    return (
      <CollapseContainer
        className={classnames(
          className,
          'Container',
          isArray ? 'array' : 'object',
          !!level && `level-${level}`,
        )}
      >
        {({ isCollapsed, toggleCollapse }) => {
          return (
            <>
              <Label className={'with-toolbox'} fieldName={idLabel}>
                {(escapedLabel) => (
                  <>
                    {collapsible && hasChildren && (
                      <CollapseButton collapsed={isCollapsed} onClick={toggleCollapse} />
                    )}
                    {(hideRootName && id === EBuiltInKeys.ROOT) || parentType === 'array' ? (
                      <span className='wrapper' />
                    ) : (
                      <span className='wrapper'>{`${wrapWithQuotes(
                        escapedLabel,
                        'string',
                        viewerUseQuotes,
                      )}:`}</span>
                    )}
                    {isCollapsed && <span className='brackets'>{isArray ? '[ … ]' : '{ … }'}</span>}
                    <Toolbox>
                      {!isCollapsed && hasChildren && (
                        <>
                          <TypeSelector
                            id={fieldNameId}
                            type={selectedType}
                            onChange={handleTypeChanged}
                          />
                          <Button
                            className='positive'
                            type='button'
                            onClick={handleInlineEditing}
                            title={title}
                            icon={<SVGIcon icon='add' />}
                          />
                          <CopyButton
                            title={
                              id === EBuiltInKeys.ROOT
                                ? 'Copy entire object'
                                : `Copy ${unescapeFieldName(id || idLabel)} node`
                            }
                            // treeDescriptor={treeDescriptor}
                          />
                        </>
                      )}
                      {!(parentName === EBuiltInKeys.ROOT && level === 0) && (
                        <RemoveButton
                        // treeDescriptor={{}}
                        />
                      )}
                    </Toolbox>
                  </>
                )}
              </Label>
              {!isCollapsed && (
                <span className='Children'>
                  <For<TJSONValue, TElement>
                    each={item}
                    item={ForItemComponent}
                    itemProps={{
                      level: level + 1,
                      parentName: idLabel,
                      parentType: isArray ? 'array' : 'object',
                      path: fieldNameId,
                    }}
                  ></For>
                  {!hasChildren && (
                    <AddNewItem
                    // treeDescriptor={{ ...treeDescriptor, level: treeDescriptor.level + 1 }}
                    />
                  )}
                  {hasChildren && inlineEditing && (
                    <AddNewField
                      initialFieldName={isArray ? item.length.toString() : undefined}
                      fieldNameEditable={!isArray}
                      newType={selectedType}
                      // treeDescriptor={{ ...treeDescriptor, level: treeDescriptor.level + 1 }}
                      cancel={handleCancelAddingNewField}
                    />
                  )}
                </span>
              )}
            </>
          );
        }}
      </CollapseContainer>
    );
  },
);
