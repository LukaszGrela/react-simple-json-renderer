import { FC, useMemo } from 'react';
import { classnames } from '../../utils/classnames';
import { unescapeFieldName } from '../../utils/fieldName';
import { IProps } from './types';

const Label: FC<IProps> = ({ fieldName, className, children }): JSX.Element => {
  const escapedLabel = useMemo(() => unescapeFieldName(fieldName), [fieldName]);

  return (
    <span className={classnames('Label', className)} title={escapedLabel}>
      {children ? (
        children(escapedLabel, <span className='wrapper'>{escapedLabel}</span>)
      ) : (
        <span className='wrapper'>{escapedLabel}</span>
      )}
    </span>
  );
};

export default Label;
