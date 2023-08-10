import { FC } from 'react';
import { For, observer } from '@legendapp/state/react';
import { TElement, TForItem, guardArrayObservable } from '../../types';
import { classnames } from '../../utils/classnames';
import { TJSONArray, TJSONObject, TJSONValue } from '../../../types';
import { EBuiltInKeys, useJSONRendererContextConfig } from '../../context';
import { Label } from '../../components';
import { wrapWithQuotes } from '../../utils/string';
import { keys } from '../../utils/object/keys';
import { CollapseButton } from '../../components/CollapseButton';
import { CollapseContainer } from '../../components/CollapseContainer';

type TProps = TElement &
  TForItem<TJSONArray | TJSONObject> & {
    ForItemComponent: FC<TElement & Omit<TForItem<TJSONValue>, 'item'>>;
  };
export const ViewerContainer: FC<TProps> = observer(
  ({ id, className, level = 0, item, parentName, parentType, ForItemComponent }) => {
    const config = useJSONRendererContextConfig();
    const collapsible = config.collapsible.get();
    const hideRootName = config.hideRootName.get();
    const viewerUseQuotes = config.viewerUseQuotes.get();

    const idLabel =
      typeof id === 'number' || (typeof id === 'string' && id !== '') ? `${id}` : '<EMPTY>';

    const fieldNameId = `${parentName}.${idLabel}`;
    const isArray = guardArrayObservable(item);
    const hasChildren = isArray ? item.length > 0 : keys(item.peek()).length > 0;

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
              <Label /*  className={!!toolbox && 'with-toolbox'} */ fieldName={idLabel}>
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
                    {/* {toolbox} */}
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
                      parentName: fieldNameId,
                    }}
                  ></For>
                </span>
              )}
            </>
          );
        }}
      </CollapseContainer>
    );
  },
);
