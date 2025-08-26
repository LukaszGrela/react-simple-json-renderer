import React from 'react';
import { TEditor } from './types';
import { useJSONRendererContext, JSONRendererActionsProvider } from '../context';
import { Element } from './components';
import { observer } from '@legendapp/state/react';

const Editor: TEditor = observer((): JSX.Element => {
  const context = useJSONRendererContext();

  return (
    <JSONRendererActionsProvider>
      <div className='Editor'>
        <div className='Editor_treeBuilder'>
          {<Element item={context} className='editor root' />}
        </div>
      </div>
    </JSONRendererActionsProvider>
  );
});

export default React.memo(Editor);
