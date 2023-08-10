import { FC, useCallback, useMemo, useState } from 'react';
import noop from 'lodash/noop';
import { IProps, TFunctionProps, guardFunctionChildren } from './types';
import { useJSONRendererContextConfig } from '../../context';
import { classnames } from '../../utils/classnames';
import { observer } from '@legendapp/state/react';

const CollapseContainer: FC<IProps> = observer(
  ({ className, initialCollapsed, children }: IProps): JSX.Element => {
    const config = useJSONRendererContextConfig();
    const collapsible = config.collapsible.get();
    const [isCollapsed, setIsCollapsed] = useState(!!initialCollapsed);

    const toggleCollapse = useCallback(() => {
      setIsCollapsed((state) => !state);
    }, []);

    const setCollapsed = useCallback((state: boolean): void => {
      setIsCollapsed(state);
    }, []);

    const props: TFunctionProps = useMemo(
      () => ({
        isCollapsed: collapsible ? isCollapsed : false,
        collapsible,
        toggleCollapse: collapsible ? toggleCollapse : noop,
        setCollapsed: collapsible ? setCollapsed : noop,
      }),
      [collapsible, isCollapsed, setCollapsed, toggleCollapse],
    );

    return collapsible ? (
      <div className={classnames(className, props.isCollapsed && 'collapsed')}>
        {!props.isCollapsed && !guardFunctionChildren(children) && children}
        {guardFunctionChildren(children) && children(props)}
      </div>
    ) : (
      <div className={classnames(className, props.isCollapsed && 'collapsed')}>
        {!guardFunctionChildren(children) && children}
        {guardFunctionChildren(children) && children(props)}
      </div>
    );
  },
);

export default CollapseContainer;
