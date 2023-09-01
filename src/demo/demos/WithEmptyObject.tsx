import { FC } from 'react';
import { JSONRenderer } from '~/lib';
import { TParams } from './types';

export const WithEmptyObject: FC<TParams> = ({ useEditor, useViewer, ...config }): JSX.Element => {
  return (
    <JSONRenderer data={{}} config={config} onChange={console.log}>
      {useEditor && <JSONRenderer.Editor />}
      {useViewer && <JSONRenderer.Viewer />}
    </JSONRenderer>
  );
};
