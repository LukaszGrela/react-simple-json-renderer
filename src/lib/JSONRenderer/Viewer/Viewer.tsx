import React from 'react';
import { observer } from '@legendapp/state/react';
import { TViewer } from './types';
import { useJSONRendererContext } from '../context';
import { Element } from './components';

const Viewer: TViewer = observer((): JSX.Element => {
  const context = useJSONRendererContext();

  return (
    <div className='Viewer'>
      <div className='Viewer_treeBuilder'>{<Element item={context} className='viewer root' />}</div>
    </div>
  );
});

export default React.memo(Viewer);
