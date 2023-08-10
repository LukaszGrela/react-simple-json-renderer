import { FC } from 'react';
import { EBuiltInKeys, useJSONRendererContextConfig } from '../../context';
import { classnames } from '../../utils/classnames';
import { wrapWithQuotes } from '../../utils/string';
import { Label } from '../Label';
import { Value } from '../Value';
import { IProps } from './types';
import { observer } from '@legendapp/state/react';
import { TDataType } from '../../../types';

const Leaf: FC<IProps> = observer(({ id, level, value, parentType }: IProps): JSX.Element => {
  const config = useJSONRendererContextConfig();
  const viewerUseQuotes = config.viewerUseQuotes.get();
  const hideRootName = config.hideRootName.get();
  const idLabel =
    typeof id === 'number' || (typeof id === 'string' && id !== '') ? `${id}` : '<EMPTY>';
  const type: TDataType = value === null ? 'null' : (typeof value as TDataType);

  return (
    <div className={classnames('Leaf', 'view', type, !!level && `level-${level}`)}>
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
});

export default Leaf;
