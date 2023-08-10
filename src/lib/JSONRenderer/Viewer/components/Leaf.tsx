import { FC } from 'react';
import { observer } from '@legendapp/state/react';
import { TElement, TForItem } from '../../types';
import { TDataType, TJSONPrimitiveValue } from '../../../types';
import { EBuiltInKeys, useJSONRendererContextConfig } from '../../context';
import { classnames } from '../../utils/classnames';
import { Label, Value } from '../../components';
import { wrapWithQuotes } from '../../utils/string';

type TProps = TElement & TForItem<TJSONPrimitiveValue>;
export const Leaf: FC<TProps> = observer(
  ({
    item,
    className,
    parentType,
    id = EBuiltInKeys.ROOT,
    level = 0,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parentName = EBuiltInKeys.ROOT,
  }: TProps) => {
    const value = item.get();
    const config = useJSONRendererContextConfig();
    const viewerUseQuotes = config.viewerUseQuotes.get();
    const hideRootName = config.hideRootName.get();
    const idLabel =
      typeof id === 'number' || (typeof id === 'string' && id !== '') ? `${id}` : '<EMPTY>';

    const type: TDataType = value === null ? 'null' : (typeof value as TDataType);

    return (
      <div
        className={classnames(
          className,
          'Element',
          'Leaf',
          'view',
          type,
          !!level && `level-${level}`,
        )}
      >
        <Label fieldName={idLabel}>
          {(escapedLabel) =>
            (hideRootName && id === EBuiltInKeys.ROOT) || parentType == 'array' ? (
              <span className='wrapper' />
            ) : (
              <span className='wrapper'>{`${wrapWithQuotes(
                escapedLabel,
                'string',
                viewerUseQuotes,
              )}:`}</span>
            )
          }
        </Label>
        <Value
          editable={false}
          dataType={type}
          value={`${wrapWithQuotes(`${value}`, type, viewerUseQuotes || type === 'string')}${
            parentType === 'array' ? ',' : ''
          }`}
        />
      </div>
    );
  },
);
