import { FC, useMemo } from 'react';
import { classnames } from '../../utils/classnames';
import { unescapeFieldName } from '../../utils/fieldName';
import { IProps } from './types';

const Label: FC<IProps> = ({ treeDescriptor, className }): JSX.Element => {
  const escapedLabel = useMemo(() => unescapeFieldName(treeDescriptor.key), [treeDescriptor.key]);

  return (
    <span className={classnames('Label', className)} title={escapedLabel}>
      {escapedLabel}
    </span>
  );
};

export default Label;
