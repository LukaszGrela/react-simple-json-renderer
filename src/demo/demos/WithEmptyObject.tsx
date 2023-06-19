import { FC } from 'react';
import { JSONRenderer } from '~/lib';
import { DemoWrapper } from './DemoWrapper';
export const WithEmptyObject: FC = (): JSX.Element => {
  return (
    <DemoWrapper>
      {({ useEditor, useViewer, ...config }) => (
        <JSONRenderer data={{}} config={config} onChange={console.log}>
          {useEditor && <JSONRenderer.Editor />}
          {useViewer && <JSONRenderer.Viewer />}
        </JSONRenderer>
      )}
    </DemoWrapper>
  );
};
