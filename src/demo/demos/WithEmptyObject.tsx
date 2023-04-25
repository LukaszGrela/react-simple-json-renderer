import React, { FC } from 'react';
import { JSONRenderer } from '~/lib';
import { DemoWrapper } from './DemoWrapper';
export const WithEmptyObject: FC = (): JSX.Element => {
  return (
    <DemoWrapper>
      {({ useEditor, useViewer, collapsible, viewerUseQuotes }) => (
        <JSONRenderer data={{}} collapsible={collapsible} viewerUseQuotes={viewerUseQuotes}>
          {useEditor && <JSONRenderer.Editor />}
          {useViewer && <JSONRenderer.Viewer />}
        </JSONRenderer>
      )}
    </DemoWrapper>
  );
};
