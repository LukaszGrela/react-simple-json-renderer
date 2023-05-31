import { FC } from 'react';
import { useJSONRendererContextConfig } from '../../context';
import { classnames } from '../../utils/classnames';
import { wrapWithQuotes } from '../../utils/string';
import { Label } from '../Label';
import { Value } from '../Value';
import { IProps } from './types';

const Leaf: FC<IProps> = ({ treeDescriptor, value }): JSX.Element => {
  const { viewerUseQuotes } = useJSONRendererContextConfig();
  return (
    <div
      className={classnames(
        'Element',
        'Leaf',
        'view',
        treeDescriptor.type,
        !!treeDescriptor.level && `level-${treeDescriptor.level}`,
      )}
    >
      <Label fieldName={treeDescriptor.key}>
        {(escapedLabel) =>
          treeDescriptor.parentType !== 'array' ? (
            <span className='wrapper'>{`${wrapWithQuotes(
              escapedLabel,
              'string',
              viewerUseQuotes,
            )}:`}</span>
          ) : null
        }
      </Label>
      <Value
        editable={false}
        dataType={treeDescriptor.type}
        value={`${wrapWithQuotes(
          value,
          treeDescriptor.type,
          viewerUseQuotes || treeDescriptor.type === 'string',
        )}${treeDescriptor.parentType === 'array' ? ',' : ''}`}
      />
    </div>
  );
};

export default Leaf;
