import { FC } from 'react';
import { JSONRenderer } from '~/lib';
import { DemoWrapper } from './DemoWrapper';
export const WithEmptyArray: FC = (): JSX.Element => {
  return (
    <DemoWrapper>
      {({ useEditor, useViewer, collapsible, viewerUseQuotes, hideRootName }) => (
        <JSONRenderer
          data={[]}
          collapsible={collapsible}
          viewerUseQuotes={viewerUseQuotes}
          hideRootName={hideRootName}
          onChange={console.log}
        >
          {useEditor && <JSONRenderer.Editor />}
          {useViewer && <JSONRenderer.Viewer />}
        </JSONRenderer>
      )}
    </DemoWrapper>
  );
};
